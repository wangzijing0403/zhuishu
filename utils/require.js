// https://b.zhuishushenqi.com/category/classifylist?node=bf0a65255a5b4c138052dca8ef065753 
export function requestGet(url, data) {
    return new Promise((reslove, reject) => {
      wx.request({
        //请求地址
        url: url,
        //请求方式
        method: "get",
        //请求参数
        data: data,
        //设置请求头  如果发送的是post请求，一定要添加请求的content-type
        header: {
          "content-type": "application/json",
        },
        //请求返回结果的数据类型
        dataType: "json",
        //请求回调
        success: ({ statusCode, data }) => {
          if (statusCode === 200) {
            reslove(data);
          } else {
            reject("服务器响应出错");
          }
        },
        // 请求失败执行的回调函数
        fail: function (err) {
          reject(err)
        },
        // 接口调用结束的回调函数（调用成功、失败都会执行）
        complete: function (res) {},
      });
    });
  }
  
  
  export var indexURL = "https://b.zhuishushenqi.com/category/classifylist?node=bf0a65255a5b4c138052dca8ef065753" //首页
  export var bookURL="https://bookapi01.zhuishushenqi.com/book/"                                                        //书籍详情  ?_id
  export var reviewURL="http://api.zhuishushenqi.com/post/review/by-book?book="           //评论
  export var bookCityURL="https://b.zhuishushenqi.com/category/statics?packageName=sapp"                  //书籍一级分类列表
  export var bookCityDetailURL="https://b.zhuishushenqi.com/books/fuzzy-search?"     //gender=male&type=hot&query=玄幻&cat=东方玄幻
  export var bookCityCatURL="https://b.zhuishushenqi.com/category/cats"
  export var searchBookURL="https://b.zhuishushenqi.com/books/fuzzy-search?model.packageName=sapp&model.start=0"//&model.limit=20&model.query=
  export var bookKeyURL="https://bookapi02.zhuishushenqi.com/btoc?view=summary&platform=h5&book="
  export var bookChapter1URL="https://bookapi01.zhuishushenqi.com/dtoc/"
  export var bookChapter2URL="?view=chapters&channel=mweb&platform=h5&token=TbnzQSOX0DSYw0ck7af5b931604c58f33bd0841e4e3e37737c2bf3124f03e47dddac96de46b0d534c83e8843c696793c1e3b452b440a3bdea96fb3d0b1911d5606c6931f3e5c3b286ae0cf22d638d2c861d59c4ea937e188"
  export var bookContentURL="http://chapterup.zhuishushenqi.com/chapter/"
