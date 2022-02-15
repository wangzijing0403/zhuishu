// pages/bookcity/bookcity.js
import { requestGet, bookCityDetailURL,bookCityCatURL } from "../../utils/require";
import Toast from "../../conmonpents/dist/toast/toast";
Page({
  data: {
    gender:[],
    query:[],
    active: 1,
    cat:[],
    type:['热门','新书','好评','完结'],
    book:[],
    cat_id:0,
    type_id:0,
  },
  onLoad: function (options) {
    this.gender = options.gender;
    this.query = options.query;
    this.type='hot';
    this.limit=20;
    wx.setNavigationBarTitle({ title: options.query }) 
    this.getBookCatData();
    this.getBookDetailData();
  },
  async getBookCatData() {
    const result = await requestGet(bookCityCatURL);
    // console.log(result.[this.gender])
    for(var i=0 ; i<result.[this.gender].length;i++){
      // console.log(result.[this.gender][i].major)
      if(result.[this.gender][i].major==this.query){
        this.catAll=result.[this.gender][i].mins
        console.log(this.cat,'xxxx')
        this.setData({
          cat:result.[this.gender][i].mins
        });
      }
    }
    
  },

  async getBookDetailData() {
    Toast.loading({
      duration: 0,
      message: "加载中...", 
      forbidClick: true,
      loadingType: "spinner",
      selector: '#van-toast',
    });
    const result = await requestGet(`${bookCityDetailURL}limit=${this.limit}&gender=${this.gender}&query=${this.query}&type=${this.type}&cat=`);
    this.setData({
      book:result.books
    });
    Toast.clear();
  },
  onReachBottom: function () {
    this.limit+=20
    this.getBookDetailData();
  },
  typeHandler:function(e){
    var _this=this
    this.typeAll=['hot','new','reputation','over']
    // console.log(this.typeAll[e.currentTarget.dataset.id]);
    this.type=this.typeAll[e.currentTarget.dataset.id]
    this.setData({
      type_id:e.currentTarget.dataset.id
    });
    wx.request({
      url: `${bookCityDetailURL}limit=20&gender=${this.gender}&query=${this.query}&type=${this.typeAll[e.currentTarget.dataset.id]}&cat=`, //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
          console.log(res.data)
          _this.setData({
          book:res.data.books
        });
      }
    })
  },
  catHandler:function(e){
    var _this=this
    // console.log(this.catAll[e.currentTarget.dataset.id]);
    this.cat=this.catAll[e.currentTarget.dataset.id]
    this.setData({
      cat_id:e.currentTarget.dataset.id
    });
    wx.request({
      url: `${bookCityDetailURL}limit=20&gender=${this.gender}&query=${this.query}&type=&cat=${this.catAll[e.currentTarget.dataset.id]}`, //仅为示例，并非真实的接口地址
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
          console.log(res.data)
          _this.setData({
          book:res.data.books
        });
      }
    })
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
})