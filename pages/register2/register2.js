// pages/register2/register2.js
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
      url: "https://www.wowyou.cc/api/user/reg",
      data:{
        mobile:that.uploadData.mobile,
        code:that.uploadData.vCode,
        images:that.uploadData.jpg1+","+that.uploadData.jpg2,
        t:that.uploadData.t,  
      },
      method:"POST",
      success(response) {
        if(res){

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
  // register: function (e) {
  //   var obj = {
  //     login: true,
  //     url: 'https://www.wowyou.cc/api/user/reg',
  //     mobile: '15914114079',
  //     images: '../../imgs/sample-1.jpg',
  //     success(response) {
  //       console.log(JSON.stringify(response));
  //       console.log('登录完毕111');
  //     },
  //     error(error) {
  //       console.log(JSON.stringify(error));
  //     },
  //     complete(res) {
  //       console.log(JSON.stringify(res));
  //     }
  //   }
  //   register(qcloud, obj);
  // },

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
      var mobile = e.detail.value.mobile;
      var t = Date.parse(new Date());
      var that = this;
      that.uploadData.t = t;
      var obj = {
        login: true,
        url: "https://www.wowyou.cc/api/api/send",
        data:{
          mobile:mobile,
          t:t,
        },
        success(response) {
          console.log(JSON.stringify(response));
          console.log('获取成功');
        },
        error(error) {
          console.log(JSON.stringify(error));
          console.log('获取失败');
        },
        complete(res) {
          console.log(JSON.stringify(res));
          console.log('获取过程完成');
        }
      }
              console.log(obj);
      qcloud.request(obj);
      }  
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
