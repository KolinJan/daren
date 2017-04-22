// pages/talentactivity/talentactivity.js
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
  ntRequireIconState:function(){
    wx.navigateTo({
      url: '../require-icon-state/require-icon-state',
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
    ntQualificationAquired:function(){
        wx.navigateTo({
          url: '../qualification-aquired/qualification-aquired',
        })
    }  
})