// pages/mechant-acting-list/mechant-acting-list.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    getList(this);
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
  lookForDetails:function(e){
    wx.navigateTo({
      url: '../mechant-acting-details/mechant-acting-details?aid='+e.currentTarget.dataset.aid,
    })
  }
})

function getList(that){
    var obj = {
        login:true,
        url: 'https://www.wowyou.cc/api/activity/activityGoing',
        data:{
          status:1
        },
        success: function (e) {
            console.log(e); console.log('console.log(e);');
            if(e.data.code == 0 ){
                that.setData({
                    activityList:e.data.data.data,
                });
            }
            console.log(that.data); console.log('that.data');
        },
    }
    qcloud.request(obj);  
}