// pages/upload-evidence/upload-evidence.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var config = require('../../config');
Page({
  data: {
    sample: sample(),
    tempFilePaths1: '',
    tempFilePaths2: ''
  },
  uploadData:{
    jpg1:'',
    jpg2:'',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options);console.log('options');
    this.setData({
      aid:options.aid
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  reg: function(e) {
    var that = this;
    that.uploadData.mobile = e.detail.value.mobile;

    var resUpload = {
      login: true,
      url: "https://www.wowyou.cc/api/activity/uploadActImg",
      method:"POST",      
      data:{
        images:that.uploadData.jpg1,
        aid:that.data.aid
      },
      success(res) {
        if(res.data.code == 0){
          wx.showModal({
            title: '结果',
            content: res.data.data,
            showCancel:false,
            success: function(res) {
              if (res.confirm) {
                wx.navigateTo({
                  url: '../attended/attended',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }            
          })       
        }else{
          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel:false,
          })
        }
      },
    }
    console.log(resUpload);
    qcloud.request(resUpload);
  },
  // ----------------------------------------从相册选择照片-------------------------------------------
  smallToBig: function (e) {
    console.log(e);
    var index = e.target.dataset.params;
    this.setData({
      maskSrc: this.data.sample[index],
      maskDisplay: 'maskBlock',
    });
  },
  maskCancel: function (e) {
    console.log(123);
    this.setData({
      maskDisplay: 'maskNone',
      maskSrc: '',
    });
  },

// +号添加图片事件
funevent: function (e) {
    var that = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                var picUrl = '';
                wx.uploadFile({
                    url:'https://www.wowyou.cc/api/upload/uploadOne', 
                    filePath:tempFilePaths[0],
                    name:'image',
                    success:function(res){
                        console.log(JSON.parse(res.data).data);
                        picUrl = JSON.parse(res.data).data;
                            that.uploadData.jpg1 = JSON.parse(res.data).data;
                            that.setData({
                            tempFilePaths1: tempFilePaths[0],
                            show1: 'block'
                          });
                        console.log(that.uploadData);
                    },
                    error:function(res){
                            console.log(res);
                    }
                });
            }
        })
    },
})

function sample() {
  return [
    "../../imgs/sample-1.jpg",
    "../../imgs/sample-2.jpg"
  ];
}

function register(qcloud, obj) {
  qcloud.request(obj);
}