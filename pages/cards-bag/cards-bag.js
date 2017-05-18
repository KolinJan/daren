// pages/cards-bag/cards-bag.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
Page({
  data:{
    cardData:{},
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);console.log('console.log(options);');
    getCardList(options.aid,this);
    this.setData({
      id:options.id,
      aid:options.aid
    });
    console.log(this.data);
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
  changeStatus:function(e){
    var that = this;
    console.log(this.data.cardData);console.log("this.data.cardData");
    wx.showModal({
      title: "提示",
      content: "确定立即使用 "+this.data.cardData.voucher_title+" 卡券?",
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          useCard(that);
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})

function getCardList(id,that){
    var obj = {
        login:true,
        url: 'https://api.wowyou.cc/api/v1/voucher/voucherDetail',
        data:{aid:id},
        success: function (e) {
            console.log(e); console.log('console.log(e);');
            if(e.data.code == 0 ){
                that.setData({
                    cardData:e.data.data,
                });
            }
 console.log(that.data); console.log('that.data');
        },
    }
    qcloud.request(obj);  
}

function useCard(that){
    var obj = {
        login:true,
        url: 'https://api.wowyou.cc/api/v1/voucher/voucherUse',
        data:{
          vid:that.data.cardData.voucher_id,
          aid:that.data.cardData.voucher_act_id,
          id:that.data.id
          },
        method:"GET",
        success: function (e) {
            console.log(e); console.log('使用圈');
            if(e.data.code == 0 ){
              wx.showToast({
                title: '使用成功',
                icon: 'success',
                duration: 2000
              })
              getCardList(that.data.aid,that);
            }else{
              wx.showToast({
                title: '已使用或已过期',
                icon: 'success',
                duration: 2000
              })
            }
 console.log(that.data); console.log('that.data');
        },
    }
    qcloud.request(obj);    
}