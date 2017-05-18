// pages/mechant-acting-details/mechant-acting-details.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);
    getDetails(options.aid,this);
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
  },  ntRequireIconState:function(){
    wx.navigateTo({
      url: '../require-icon-state/require-icon-state',
    })
  },
  ntMechantCT:function(){
    wx.navigateTo({
      url: '../mechant-checking-talent/mechant-checking-talent',
    })
  },
  previewImages:function(e){
    console.log(e);
    var status = e.currentTarget.dataset.status;
    var userId = e.currentTarget.dataset.userid
    if(status == 3){
      preview(userId,this);
    }
  },
  ntMore:function(e){
    console.log(e);console.log('查看aid');
    wx.navigateTo({
      url: '../moreJoinerList/moreJoinerList?aid='+e.currentTarget.dataset.aid,
    })
  },
  sureDefault:function(e){
    sureDefault(this,e.currentTarget.dataset.id,e.currentTarget.dataset.status);
  },
  sureEval:function(e){
    console.log(e.currentTarget.dataset.id);console.log('sssssssssssssssssssss');
    sureEval(this,e.currentTarget.dataset.id,e.currentTarget.dataset.status);
  }
})

function getDetails(aid,that){
    var obj = {
        login:true,
        url: 'https://api.wowyou.cc/api/v1/activity/detail',
        data:{aid:aid},
        success: function (e) {
            console.log(e); console.log('console.log(e);');
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

function preview(userId,that){
  loading();
    var obj = {
        login:true,
        url: 'https://api.wowyou.cc/api/v1/activity/uploadActImgDetail',
        data:{aid:that.data.details.id,
              uid:userId
        },
        success: function (e) {
            stopLoading()
            console.log(e); console.log('商家查看上传图片接口');
            if(e.data.code == 0 ){
                wx.previewImage({
                  current: '', // 当前显示图片的http链接
                  urls: [e.data.data.images[0]] // 需要预览的图片http链接列表
                })              
            }
//  console.log(that.data); console.log('that.data');
        },
    }
    qcloud.request(obj);
}

function loading(){
  wx.showLoading({
    title: '加载中',
  })
}

function stopLoading(){
    wx.hideLoading();
}

function sureDefault(that,userid,status){
  console.log(that.data);
  if(status == 3){
      wx.showToast({
        title: '默认评价成功',
        icon: 'success',
        duration: 2000
      })
      that.setData({
        setDefalut:1
      });
      console.log(that.data);
      console.log('查看default');
    }    
  }

function sureEval(that,userid,status){
    if(status == 3){
        wx.showActionSheet({
          itemList: ['60', '70', '80','90','100'],
          success: function(res) {
            console.log(res.tapIndex)
            var obj = {
                login:true,
                url: 'https://api.wowyou.cc/api/v1/comment/commentAdd',
                data:{id:userid,star:res.tapIndex,aid:that.data.details.id},
                success: function (e) {
                    console.log(e); console.log('console.log(e);');
                    if(e.data.code == 0 ){
                        that.setData({
                          hEval:1
                        });
                    }
                },
            }
            qcloud.request(obj);      
          },
        }) 
    } 
}