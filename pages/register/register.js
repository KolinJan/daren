// pages/mine/mine.js
Page({
  data:{
    is_vip:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.getStorage({
      key: 'is_vip',
      success: function(res){
        // success
        if(res.data == "1"){
          console.log("游客");
        }else if(res.data == "2"){
          console.log("达人");
        }else{
          console.log("审核中");
        }
      },
    })
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
  ntRegister2:function(){
    wx.navigateTo({
      url: '../register2/register2',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  ntRegisterMerchant:function(){
    wx.navigateTo({
      url: '../register-merchant/register-merchant',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }
})