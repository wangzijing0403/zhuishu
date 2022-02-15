import { requestGet, bookContentURL, bookChapter1URL, bookChapter2URL } from "../../utils/require";
import Toast from "../../conmonpents/dist/toast/toast";
Page({
  data: {
    content: [],
    vip: false
  },
  onLoad: function (options) {
    var _this = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      // console.log(data,'asdaf')
      _this.id = data.id
      _this.url = encodeURIComponent(data.data)
      console.log(_this.url.length, 'asdasfas')
      // _this.url=encodeURIComponent(data.data)
    })
    if (_this.url.length > 150) {
      this.setData({
        content: '暂无资源',
      });
    } else { this.getContentData() }
    // this.getContentDatas()
  },
  async getContentData() {
    // console.log(this.url,`${bookContentURL}${this.url}`)
    const result = await requestGet(`${bookContentURL}${this.url}`);
    // console.log(atob(result.chapter.cpContent)decodeURIComponent(, '4444444')
    // var enc =window.btoa(result.chapter.cpContent)
    // console.log(decodeURIComponent(atob(enc)))
    // console.log(urldecode(atob(result.chapter.cpContent)))
    console.log(result)
    this.setData({
      content: result.chapter,
    });
  },
  // async getContentDatas() {
  //   // console.log(this.url,`${bookContentURL}${this.url}`)
  //   const result = await requestGet(`${bookChapter1URL}${this.id}${bookChapter2URL}`);
  //   // console.log(atob(result.chapter.cpContent)decodeURIComponent(, '4444444')
  //   // var enc =window.btoa(result.chapter.cpContent)
  //   // console.log(decodeURIComponent(atob(enc)))
  //   // console.log(urldecode(atob(result.chapter.cpContent)))
  //   console.log(result)
  //   // this.setData({
  //   //   content:result.chapter.cpContent,
  //   // });
  // },
  onClickLeft(e) {
    var _this = this;
    var order = e.currentTarget.dataset.id - 2
    console.log(order)
    wx.request({
      url: `${bookChapter1URL}${this.id}${bookChapter2URL}`,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data.chapters[order].link)

        _this.url = encodeURIComponent(res.data.chapters[order].link)
        _this.getContentData()
        wx.pageScrollTo({
          scrollTop: 0
        })
      }
    })
  },
  onClickRight(e) {
    var _this = this;
    var order = e.currentTarget.dataset.id
    console.log(order)
    wx.request({
      url: `${bookChapter1URL}${this.id}${bookChapter2URL}`,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.chapters[order].isVip) {
          Toast('暂无资源');
         } else {
          _this.url = encodeURIComponent(res.data.chapters[order].link)
          _this.getContentData()
          wx.pageScrollTo({
            scrollTop: 0
          })
        }
        // console.log(res.data.chapters[order].link)

      }
    })
  },

})