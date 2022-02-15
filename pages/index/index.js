// index.js
// 获取应用实例
const app = getApp()
import { requestGet, indexURL } from "../../utils/require";
Page({
  data: {
    imgUrls: [],
    series: [],
    boook: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad() {
    this.getSwiperData();
    this.getCell1Data();
  },
  async getSwiperData() {
    const result = await requestGet(indexURL);
    // console.log(result.data.spread[0].advs)
    // console.log(result,'111')
    this.setData({
      imgUrls: result.data.spread[0].advs,
    });
  },
  async getCell1Data() {
    const result = await requestGet(indexURL);
    // console.log(result.data.nodes[1])
    // console.log(result,'222')
    this.setData({
      series: result.data.nodes
    });
  },
  onSearch: function (e) {
    wx.navigateTo({
      url: '/pages/booksearch/booksearch',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: e.detail })
      }
    })
  }
})
