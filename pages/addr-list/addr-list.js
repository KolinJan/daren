// pages/addr-add/addr-add.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
Page({
  data:{
    listData:[''],
    default_id:undefined,
    hasAddr:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    // getAddrList(this);
  }, 
  onShow:function(){
    // 页面显示
    getAddrList(this);
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
  },
  radioChange:function(e){
    console.log(e);
    this.setData({
      default_id : e.detail.value
    });
    changeDefault(this);
  },
  del:function(e){
    var delId = e.target.dataset.aid;
    delAddr(this,delId);
  }
})

function getAddrList(that){
  var obj = {
    url:'https://www.wowyou.cc/api/user/addressList',
    success:function(e){
      console.log(e);
      if(e.data.code == 0){
        console.log(123);
        console.log(e.data.data);
        that.setData({
          listData:e.data.data,
          hasAddr:1
        });
      }
    },    
  }
  qcloud.request(obj);
}

function changeDefault(that){
  var id = that.data.default_id;
  if(id != undefined){
    var obj = {
      url:'https://www.wowyou.cc/api/user/setDefault',
      data:{id:id},
      success:function(e){
        if(e.data.code == 0){
          wx.showToast({
            title: '默认地址修改成功',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '修改失败,请检查网络',
            icon: 'loading',
            duration: 1000
          })
        }
        console.log(e);
      },    
    }
    console.log(obj);console.log('obj');
  }
  qcloud.request(obj);  
}

function delAddr(that,id){
  if(id != undefined){
    var obj = {
      url:'https://www.wowyou.cc/api/user/addressDel',
      data:{aid:id},
      success:function(e){
        if(e.data.code == 0){
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
        }else{
          wx.showToast({
            title: '删除失败,请检查网络',
            icon: 'loading',
            duration: 1000
          })
        }
        console.log(e);
      },    
    }
    console.log(obj);console.log('obj');
  }
  qcloud.request(obj);   
}