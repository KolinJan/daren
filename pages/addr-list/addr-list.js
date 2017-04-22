// pages/addr-add/addr-add.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  ntAddrAdd:function(){
    wx.navigateTo({
      url: '../addr-add/addr-add',
    })
  }
})