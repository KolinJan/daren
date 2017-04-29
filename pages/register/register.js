// pages/mine/mine.js
Page({
  data:{
    display:'diplayhide',
    tips:['审核通过后，以后将自动登录','审核中，别焦急呢~',' ','对不起，审核没通过呢~',],
    tipsShow:''
  },
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.getStorage({
      key: 'master_status',
      success: function(res){
        // success
        if(res.data == "0"){
          that.setData({display:"displayblock"});
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
          tipsShow:str
        })
      },
    })
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
  ntRegister2:function(){
    wx.navigateTo({
      url: '../register2/register2',
      success: function(res){
        // success
      },
    })
  },
  ntRegisterMerchant:function(){
    wx.navigateTo({
      url: '../register-merchant/register-merchant',
      success: function(res){
        // success
      },
    })
  }
})