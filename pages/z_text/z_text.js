// pages/z_text/z_text.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
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
  pay:function(){
    pay(this);
  }
})

// function getList(that){
//     var obj = {
//         login:true,
//         url: 'https://api.wowyou.cc/api/v1/activity/activityGoing',
//         data:{
//           status:1
//         },
//         success: function (e) {
//             console.log(e); console.log('console.log(e);');
//             if(e.data.code == 0 ){
//                 that.setData({
//                     activityList:e.data.data.data,
//                 });
//             }
//             console.log(that.data); console.log('that.data');
//         },
//     }
//     qcloud.request(obj);  
// }

function pay(that){
  var obj = {
    login:true,
    url:'https://api.wowyou.cc/api/v1/order/pay',
    success:function(e){
      console.log(e);
      wxPay(e.data);
    },
    fail:function(e){
      console.log(e);
    },
  }
      qcloud.request(obj); 
}

function wxPay(params){
  wx.requestPayment({
   'timeStamp': params.timeStamp+'',
   'nonceStr': params.nonceStr,
   'package': params.package,
   'signType': 'MD5',
   'paySign': params.sign,
   'success':function(res){
     console.log(res);
     console.log('调用微信接口成功');
   },
   'fail':function(res){
     console.log(res);
     console.log('调用微信接口失败');
   }
})
}