// pages/register2/register2.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var config = require('../../config');
var time = 60;
Page({
  data: {
    sample: sample(),
    tempFilePaths1: '',
    tempFilePaths2: '',
    count:'获取验证码',
  },
  uploadData:{
    jpg1:'',
    jpg2:'',
    mobile:'',
    vCode:'',
    t:'',
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(this);
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
    that.uploadData.vCode = e.detail.value.vCode;

    var resUpload = {
      login: true,
      url: "https://api.wowyou.cc/api/v1/user/reg",
      method:"POST",      
      data:{
        mobile:that.uploadData.mobile,
        code:that.uploadData.vCode,
        images:that.uploadData.jpg1+","+that.uploadData.jpg2,
        t:that.uploadData.t,  
      },
      success(res) {
        if(res.data.code == 0){
          wx.showToast({
            title: res.data.data,
            icon: 'success',
            duration: 2000
          })
        setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          }, 500);
        }else{
          wx.showModal({
            title: '错误',
            content: res.data.msg,
            showCancel:false
          })
        }
      },
      error(error) {
        console.log(JSON.stringify(error));
        console.log('注册失败');
      },
      complete(res) {
        console.log(JSON.stringify(res));
        console.log('注册过程完成');
      }
    }
    console.log(resUpload);
    qcloud.request(resUpload);

    // wx.showToast({
    //   title: "成功",
    //   icon: "success",
    //   duration: 2000
    // });
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
                    url:'https://api.wowyou.cc/api/v1/upload/uploadOne', 
                    filePath:tempFilePaths[0],
                    name:'image',
                    success:function(res){
                        console.log(JSON.parse(res.data).data);
                        picUrl = JSON.parse(res.data).data;
                        console.log(e.currentTarget.dataset.params +"参数");
                        if(e.currentTarget.dataset.params == '1'){
                            that.uploadData.jpg1 = JSON.parse(res.data).data;
                            that.setData({
                            tempFilePaths1: tempFilePaths[0],
                            show1: 'block'
                          });
                        }else{
                          that.uploadData.jpg2 = JSON.parse(res.data).data;
                            that.setData({
                            tempFilePaths2: tempFilePaths[0],
                            show2: 'block'
                          });                          
                        }
                        console.log(that.uploadData);
                    },
                    error:function(res){
                            console.log(res);
                    }
                });
            }
        })
    },
    // 获取验证码
    getVCode:function(e){
      console.log(e);
      var mobile = e.detail.value.mobile;
      var t = Date.parse(new Date());
      var that = this;
      that.uploadData.t = t;
      var obj = {
        login: true,
        url: "https://api.wowyou.cc/api/v1/api/send",
        data:{
          mobile:mobile,
          t:t,
        },
        success(response) {
          console.log(response)
          if(response.data.code == 0){
            beginTimer(that);
            wx.showToast({
              title: "发送成功",
              icon: 'success',
              duration: 2000
            })
          }else{
            wx.showModal({
              title: '错误',
              content: response.data.msg,
              showCancel:false
            })
          }
        },
      }
              console.log(obj);
      qcloud.request(obj);
      },
    // beginTimer:function() {
    //     this.setData({
    //       sending: true,
    //       count:60     
    //     })
    //     let _this = this
    //     var verifyTimer = setInterval(function() {
    //       var count = _this.data.count - 1
    //       _this.setData({
    //         count: count
    //       })
    //       if (count < 1) {
    //         clearInterval(verifyTimer)
    //         _this.setData({
    //           count: "重新发送",
    //           sending: false
    //         })
    //       }
    //     }, 1000)
    //   }, 
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

function beginTimer(that){
    that.setData({
      sending: true,
      count:60     
    })
    let _this = that
    var verifyTimer = setInterval(function() {
      var count = _this.data.count - 1
      _this.setData({
        count: count
      })
      if (count < 1) {
        clearInterval(verifyTimer)
        _this.setData({
          count: "重新发送",
          sending: false
        })
      }
    }, 1000)  
}

