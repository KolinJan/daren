//app.js
var qcloud = require('vendor/qcloud-weapp-client-sdk/index');
var config = require('config');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(config)
    qcloud.setLoginUrl(config.service.loginUrl);
    qcloud.login({
        success: function (userInfo) {
            console.log('登录成功', userInfo);
        },
        fail: function (err) {
            console.log('登录失败', err);
        }
    });    
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo);
              // getUserInfo(qcloud, "https://www.wowyou.cc/api/user/userinfo");
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})

// function getUserInfo(qcloud, url) {
//     var obj = {
//         url: url,
//         success(res) {
//             console.log(res);console.log("res.data.data.is_vip");
//             if (res.data.code == 0) {
//                 wx.setStorage({
//                     key: 'master_status',
//                     data: res.data.data.master_status,       
                    
//                     success: function (res) {
//                         console.log(res)
//                     }
//                 });
//             }
//         },
//         error(res) {
//             console.log(JSON.stringify(res));
//             console.log('注册失败');
//         },
//     }
//     qcloud.request(obj);
// }