import { requestGet, bookChapter1URL, bookChapter2URL } from "../../utils/require";
import Toast from "../../conmonpents/dist/toast/toast";

Page({
  data: {
    chapter: [],
  },
  onLoad: function (options) {
    this.id = options.id
    var _this = this;
    this.num = 20
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function (data) {
      // console.log(data,'11111111111111111111')
      _this.bookid = data.data

    })
    this.getChapterData();
    // this.getContentData();

    // console.log(options.id,'0000000000000')
  },

  async getChapterData() {
    Toast.loading({
      duration: 0,
      message: "加载中...",
      forbidClick: true,
      loadingType: "spinner",
      selector: '#van-toast',
    });
    // const result = await requestGet(`http://api.zhuishushenqi.com/mix-atoc/${this.bookid}?view=chapters`);
    const result = await requestGet(`${bookChapter1URL}${this.bookid}${bookChapter2URL}`);
    // const result = await requestGet('https://bookapi01.zhuishushenqi.com/dtoc/57c032b52f7f403c4589ea86?view=chapters&channel=mweb&platform=h5&token=TbnzQSOX0DSYw0ck7af5b931604c58f33bd0841e4e3e37737c2bf3124f03e47dddac96de46b0d534c83e8843c696793c1e3b452b440a3bdea96fb3d0b1911d5606c6931f3e5c3b286ae0cf22d638d2c861d59c4ea937e188');
    console.log(`${bookChapter1URL}${this.bookid}${bookChapter2URL}`, '11111')
    console.log(result.enSource, '555555555')
    // console.log(result.chapters.slice(0,this.num),'66666')
    this.setData({
      chapter: result.chapters.slice(0, this.num),
    });
    Toast.clear();
    // console.log(result.chapters[0].link)
    // console.log(escape(result.chapters[0].link),'xxxxxxxxx')
    // this.url = escape(result.chapters)

  },
  onReachBottom: function () {
    this.num += 20
    this.getChapterData();
  },
  //   async getContentData() {
  //     this.getChapterData().then(() => {
  //       console.log(this.url, '22222222')
  //       const result =await requestGet(`${bookContentURL}${this.url}`);
  //       console.log(result,'4444444')
  //     });
  // console.log('3333333')
  // wx.request({
  //   // url: 'https://chapter31.zhuishushenqi.com/chapter2/yuewenhttp%3A//vip.zhuishushenqi.com/chapter/5f9bfb3018a1d306defbd15b%3Fcv%3D1621087942949%26cbid%3D22225198000803302%26ccid%3D7516906537954903%26chargeType%3D1%26order%3D1%26merchant%3Dyuewen',
  //   url: `${_this.bookurl}`,
  //   data: {
  //     x: '',
  //     y: ''
  //   },
  //   header: {
  //     'content-type': 'application/json' // 默认值
  //   },
  //   success (res) {
  //       console.log(res.data)
  //       _this.setData({
  //       book:res.data.books
  //     });
  //   }
  // })
  // const result = await requestGet('https://bookapi01.zhuishushenqi.com/dtoc/57c032b52f7f403c4589ea86?view=chapters&channel=mweb&platform=h5&token=TbnzQSOX0DSYw0ck7af5b931604c58f33bd0841e4e3e37737c2bf3124f03e47dddac96de46b0d534c83e8843c696793c1e3b452b440a3bdea96fb3d0b1911d5606c6931f3e5c3b286ae0cf22d638d2c861d59c4ea937e188');
  // console.log(result.chapters[0].link)
  // console.log(escape(result.chapters[0].link),'xxxxxxxxx')
  // this.url=escape(result.chapters[0].link)

  // },
  typeHandler: function (e) {
    var _this=this
    console.log(e.currentTarget.dataset.id, '123123123123')
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: '/pages/content/content',
        events: {
          acceptDataFromOpenedPage: function (data) {
            console.log(data)
          },
          someEvent: function (data) {
            console.log(data)
          }
        },
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('acceptDataFromOpenerPage', { data: e.currentTarget.dataset.id ,id:_this.bookid})
        }
      })
    }else{
      Toast('暂无资源');
    }


  },
})
