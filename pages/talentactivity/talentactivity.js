// pages/talentactivity/talentactivity.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
Page({
  data:{
    details:{},
    asked:getAskList(),
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
    })
  },
    ntQualificationAquired:function(){
      QualificationAquired(this);
    },
    openMap:function(e){
      console.log(e);console.log("接口读的定位");
      wx.openLocation({
        latitude:e.currentTarget.dataset.lat,
        longitude:e.currentTarget.dataset.lng,
        // address:"本次活动地址",
      });
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

function QualificationAquired(that){
    console.log(that.data);
    var obj = {
        login:true,
        url: 'https://www.wowyou.cc/api/activity/activityJoin',
        data:{
          aid:that.data.details.id
        },
        success: function (e) {
            console.log(e); console.log('QualificationAquired');
            if(e.data.code == 0 ){
              console.log(e);
              if(that.data.actId != undefined){
                wx.navigateTo({
                  url: '../qualification-aquired/qualification-aquired?qid='+that.data.actId,
                })
              }
            }else{
              wx.showModal({
                title: '领取失败',
                content: e.data.msg,
                success: function(res) {
                }
              })
            }
        },
    }
    qcloud.request(obj); 
}

function getAskList(){
  return [
    "../../imgs/九图.png",
    "../../imgs/二维码.png",
    "../../imgs/位置.png",
    "../../imgs/其他.png",
    "../../imgs/群发.png",    
    "../../imgs/朋友圈.png",
  ]
}