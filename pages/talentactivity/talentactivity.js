// pages/talentactivity/talentactivity.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
Page({
  data:{
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.actId); console.log('console.log(options.actId);');    
    this.setData({
      actId:options.actId
    })
    getDetails(this);    
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
  ntRequireIconState:function(){+
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

function getDetails(that){
    var obj = {
        login:true,
        url: 'https://www.wowyou.cc/api/activity/activityDetail',
        data:{
          aid:that.data.actId
        },
        success: function (e) {
            console.log(e); console.log('console.log(e);activityDetail');
            if(e.data.code == 0 ){
                that.setData({
                    details:e.data.data,
                });
            }
 console.log(that.data); console.log('that.data');
        },
    }
    qcloud.request(obj);

}