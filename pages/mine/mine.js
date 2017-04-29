//index.js
//获取应用实例
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var app = getApp()
Page({
  data: {
    userInfo: {},
    userStatus:'0',
    tips:['审核通过后，以后将自动登录','审核中，别焦急呢~',' ','对不起，审核没通过呢~',],    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    getUserStatus(this);
    getUserInfo(this);
  },
  ntAttended:function(){
    wx.navigateTo({
      url: '../attended/attended',
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
  ntSubmitEvidence:function(){
    console.log('123');
      wx.navigateTo({
      url: '../submit-evidence-list/submit-evidence-list',
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
  },ntMechantActList:function(){
    wx.navigateTo({
      url: '../mechant-acting-list/mechant-acting-list',
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
  ntMechantEndList:function(){
    wx.navigateTo({
      url: '../mechant-end-list/mechant-end-list',
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
  ntRegister2:function(){
    wx.navigateTo({
      url: '../register2/register2',
      success: function(res){
        // success
      },
    })
  },  
})


function getUserStatus(that){
    wx.getStorage({
      key: 'master_status',
      success: function(res){
        // success
        if(res.data == "0"){
          that.setData({userStatus:res.data});
          console.log("游客");
        }else if(res.data == "1"){
          console.log("审核中");
        }else if(res.data == "2"){
          console.log("达人");
        }else{
           console.log("对不起，您的审核申请失败了");
        }
        var str = that.data.tips[parseInt(res.data)];
        console.log(str);
        that.setData({
          tipsShow:str,
          userStatus:res.data
        })
      },
    })  
}

function getUserInfo(that){
    var obj = {
        login:true,
        url: 'https://www.wowyou.cc/api/user/userinfo',
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