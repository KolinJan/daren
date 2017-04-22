// pages/activity-merchant-1/activity-merchant-1.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  ntotherPage:function(e){
    console.log(e);
    var url = "";
    if(e.currentTarget.dataset.type == "2"){
        url = "../activity-merchant-2/activity-merchant-2"
    }else if(e.currentTarget.dataset.type == "0"){
      url = "../activity-merchant/activity-merchant"
    }
    wx.redirectTo({
      url: url,
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