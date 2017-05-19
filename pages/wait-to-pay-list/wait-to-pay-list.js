// pages/wait-to-pay-list/wait-to-pay-list.js
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
  pay:function(e){
    console.log(e.currentTarget.dataset.oid);
    var order_id=e.currentTarget.dataset.oid;
    pay(this,order_id);
  }
})

function getList(that){
    var obj = {
        login:true,
        url: 'https://api.wowyou.cc/api/v1/order/myOrder',
        data:{
          state:5
        },
        success: function (e) {
            console.log(e); console.log('console.log(e);');
            if(e.data.code == 0 ){
                that.setData({
                    activityList:e.data.data,
                });
            }
            console.log(that.data); console.log('that.data');
        },
    }
    qcloud.request(obj);  
}


function pay(that,oid){
  var obj = {
    login:true,
    url:'https://api.wowyou.cc/api/v1/order/pay',
    data:{
      order_id:oid
    },
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