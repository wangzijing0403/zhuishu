// pages/bookshelf/bookshelf.js
var app = getApp();
Page({
    data: {
        userInfo: []
    },
    onLoad: function(options) {
        var app = getApp();
        console.log(app.globalData.userInfo, "xxxx");
        this.getBookData();
    },
    onShow: function() {

        console.log(app.globalData.userInfo);
        this.setData({
            userInfo: app.globalData.userInfo
        });

    },
    getBookData() {},
    delete(event) {
        //获取页面传来的index索引
        var dataset = event.currentTarget.dataset;
        var _id = dataset.id;
        console.log(_id);
        var app = getApp();
        app.globalData.userInfo.splice(_id, 1);
        //删除数组中的元素后重新给data赋值刷新页面
        this.setData({
            userInfo: app.globalData.userInfo
        });
    },
})