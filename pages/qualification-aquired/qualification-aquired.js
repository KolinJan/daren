// pages/qualification-aquired/qualification-aquired.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
        aid:options.qid
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  ntCardBag:function(){
    // if(this.data.aid != undefined){
      wx.navigateTo({
        // url: '../cards-bag/cards-bag?qid='+this.data.aid,
        url: '../attended/attended',
      })
    // }
  }
})