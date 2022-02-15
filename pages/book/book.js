// pages/book/book.js
var app = getApp();
import Toast from "../../conmonpents/dist/toast/toast";
import { requestGet, bookURL, reviewURL, bookKeyURL } from "../../utils/require";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: [],
    review: [],
    star: null,
    wordCount: null,
    activeNames: ['1'],
    follower: null,
    joinbook: '加入书架',
    color: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;
    this.limit = 3;
    // console.log(bookURL,this.id)
    // console.log(reviewURL,this.id)
    // console.log(options,'xxxxxxxxxxxxx')


    this.getBookIdData();

    this.getBookData();
    this.getReviewData();
  },

  async getBookData() {
    const result1 = await requestGet(`${bookURL}${this.id}`);
    console.log(result1.enSource, '33333333333333333')
    this.source = result1.enSource

    this.author = result1.author
    this.cover = result1.cover
    this.title = result1.title
    wx.setNavigationBarTitle({ title: result1.title })
    for (var i = 0, count = 0, num = 0; i < result1.starRatings.length; i++) {
      count += result1.starRatings[i].count
      num += result1.starRatings[i].star * result1.starRatings[i].count
    }

    this.setData({
      book: result1,
      star: (num / count).toFixed(1),
      wordCount: (result1.wordCount / 10000).toFixed(2),
      follower: (result1.totalFollower / 10000).toFixed(0)
    });

  },
  async getBookIdData() {

    const result = await requestGet(`${bookKeyURL}${this.id}`);
    // console.log(result[0]._id)
    this.bookid = result[0]._id
  },
  async getReviewData() {
    Toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      selector: '#van-toast',
    });
    const result2 = await requestGet(`${reviewURL}${this.id}&limit=${this.limit}`);
    for (var i = 0; i < result2.reviews.length; i++) {
      result2.reviews[i].updated = result2.reviews[i].updated.substring(0, 10)
    }
    this.setData({
      review: result2.reviews,
    });
    Toast.clear();
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onReachBottom: function () {
    this.limit += 3
    this.getReviewData();
  },
  onReady: function () { console.log(this.star) },
  buttonTapChange: function () {

  },
  onClickJoin() {
    var flag = true

    // console.log(app.globalData.userInfo)
    var info = { "id": this.id, "cover": this.cover, "author": this.author, "title": this.title }
    for (var i = 0; i < app.globalData.userInfo.length; i++) {
      if (this.id == app.globalData.userInfo[i].id) {
        app.globalData.userInfo.splice(i, 1)
        Toast('已经移出书架');
        this.setData({
          joinbook: '加入书架',
          color: ''
        });
        flag = false;
        break;
      }
    }
    if (flag == true) {
      app.globalData.userInfo.push(info)
      Toast('加入书架成功');
      this.setData({
        joinbook: '移出书架',
        color: '#ccc'
      });
    }

    // console.log(this.id,"2222222222222222222")
  },

  onClickBegin(e) {
    var _this = this
    if (this.source == null) {

      wx.navigateTo({
        url: '/pages/detail/detail?id=' + _this.id,
        events: {
          // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
          acceptDataFromOpenedPage: function (data) {
            console.log(data)
          },
          someEvent: function (data) {
            console.log(data)
          }

        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: _this.bookid })
        }
      })
    } else {
      Toast('暂无资源');
    }


  },
  onShow: function () {
    for (var i = 0; i < app.globalData.userInfo.length; i++) {
      if (this.id == app.globalData.userInfo[i].id) {
        this.setData({
          joinbook: '移出书架',
          color: '#ccc'
        });
      }
    }
  }
})