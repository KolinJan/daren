// pages/addr-add/addr-add.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
Page({
  data:{
    listData:[''],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    getAddrList(this);
            console.log(this.data.listData);
  },
  ntAddrAdd:function(){
    wx.navigateTo({
      url: '../addr-add/addr-add',
    })
  },
  ntAddrEdit:function(e){
    console.log(e);
    wx.setStorage({
      key: 'address_id',
      data: e.target.dataset.aid,
    })
    
    wx.navigateTo({
      url: '../addr-edit/addr-edit',
    })
  }
})

function getAddrList(that){
  var obj = {
    url:'https://www.wowyou.cc/api/user/addressList',
    success:function(e){
      if(e.data.code == 0){
        console.log(123);
        console.log(e.data.data);
        that.setData({
          listData:e.data.data
        });
      }
    },    
  }
  qcloud.request(obj);
}

function changeDefault(that){
  var obj = {
    url:'',
    success:function(e){
      if(e.data.code == 0){
        console.log(123);
      }
      console.log(e);
    },    
  }
  qcloud.request(obj);  
}