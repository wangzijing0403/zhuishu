// pages/booksearch/booksearch.js
import Toast from "../../conmonpents/dist/toast/toast";
import { requestGet, searchBookURL } from "../../utils/require";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.limit = 20;
    var _this = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      console.log(data.data)
      _this.query = data.data

    })
    this.getSearchData();
  },
  async getSearchData() {
    Toast.loading({
      duration: 0,
      message: "加载中...", 
      forbidClick: true,
      loadingType: "spinner",
      selector: '#van-toast',
    });
    const result = await requestGet(`${searchBookURL}&model.limit=${this.limit}&model.query=${this.query}`);
    console.log(result,`${searchBookURL}&model.limit=${this.limit}&model.query=${this.query}`)
    this.setData({
      book: result.books
    });
    Toast.clear();
  },
  onReachBottom: function () {
    this.limit+=20
    this.getSearchData();
  },
})