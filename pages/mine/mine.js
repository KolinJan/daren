//index.js
//获取应用实例
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var app = getApp()
Page({
  data: {
    userInfo: {},
    userStatus:'',
    tips:['审核通过后，以后将自动登录','审核中，别焦急呢~',' ','对不起，审核没通过呢~',],    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })    
  },
  onShow:function(){
    getUserVip("https://api.wowyou.cc/api/v1/user/userinfo",this);    
    //调用应用实例的方法获取全局数据
    getUserInfo(this);
},
  ntAttended:function(){
    wx.navigateTo({
      url: '../attended/attended',
    })
  },
  ntSubmitEvidence:function(){
    console.log('123');
      wx.navigateTo({
      url: '../submit-evidence-list/submit-evidence-list',
    })
  },ntMechantActList:function(){
    wx.navigateTo({
      url: '../mechant-acting-list/mechant-acting-list',
    })
  },
  ntMechantEndList:function(){
    wx.navigateTo({
      url: '../mechant-end-list/mechant-end-list',
    })
  },
  ntAddrList:function(){
    wx.navigateTo({
      url: '../addr-list/addr-list',
    })
  },  
  ntRegister2:function(){
    wx.navigateTo({
      url: '../register2/register2',
    })
  },
  ntAccount:function(){
    wx.navigateTo({
      url: '../account/account/account',
    })    
  }  
})


function getUserInfo(that){
    var obj = {
        login:true,
        url: 'https://api.wowyou.cc/api/v1/user/userinfo',
        success: function (e) {
            console.log(e); console.log('console.log(e);');
            if(e.data.code == 0 ){
                that.setData({
                    userData:e.data.data,
                });
            }else{
                that.setData({
                    userData:"",
                }); 
            }
            console.log(that.data); console.log('that.data');
        },
    }
    qcloud.request(obj);   
}



function getUserVip( url,that) {
    var obj = {
        url: url,
        success(res) {
            console.log(res);console.log("res.data.data.is_vip");
            if (res.data.code == 0) {
                  // success
                  if( res.data.data.master_status == "0"){
                    that.setData({userStatus:res.data});
                    console.log("游客");
                  }else if( res.data.data.master_status == "1"){
                    console.log("审核中");
                  }else if( res.data.data.master_status == "2"){
                    console.log("达人");
                  }else{
                    console.log("对不起，您的审核申请失败了");
                  }
                  var str = that.data.tips[parseInt( res.data.data.master_status)];
                  console.log(res);
                  console.log("mine页面读取到的达人缓存");
                  that.setData({
                    tipsShow:str,
                    userStatus: res.data.data.master_status
                  })

            }
        },
        error(res) {
            console.log(JSON.stringify(res));
            console.log('注册失败');
        },
    }
    qcloud.request(obj);
}