// pages/talentactivitys-edit/talentactivitys-edit.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
Page({
  data:{
        date: '2016-09-01',
        inputValue:'',
        checkBoxShow: [false,false,false,false,false,false]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    getAddrList(this);
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    console.log(this.data);console.log("this.data");
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  bindDateChange: function(e) {
      this.setData({
        up_deadline: e.detail.value
      }); 
  },
    gradeChange:function(e){
      this.setData({
        up_grade: e.detail.value
      });
    },
    scroreChange:function(e){
      this.setData({
        up_scrore: e.detail.value
      });     
    },
    bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
    radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  checkboxChange: function(e) {
    var that = this;
    // console.log(this.data.checkboxBaseNum%2);
    // this.data.checkboxBaseNum ++;
    console.log(that.data.checkBoxShow[index]);    
    var index = e.currentTarget.id;
    var clickResult = !that.data.checkBoxShow[index];
    that.data.checkBoxShow[index] = clickResult;
    console.log(that.data.checkBoxShow[index]);
    // console.log(e);
    that.setData({
      checkBoxShow:that.data.checkBoxShow,
    });
  },
  ntAddrList:function(e){
    wx.navigateTo({
      url: '../addr-list/addr-list',
    })
  },
  getImgFromPhone:function(e){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths[0]
        uploadPic(that,tempFilePaths);
      }
    })  
  },
    submitEvent: function(e) {
    console.log(e);console.log('submit回调');
    creatActivity(this,e.detail.value);
  },
})


function getAddrList(that){
  var t = that;
  var obj = {
    url:'https://www.wowyou.cc/api/user/addressList',
    success:function(e){
      if(e.data.code == 0){
        console.log(123);
        console.log(e);
        for(var i =0;i<e.data.data.length;i++){
            console.log(e.data.data[i].is_default);
            if(e.data.data[i].is_default == 1){
              console.log('这是一个默认地址');
              t.setData({
                addrs:e.data.data[i]
              });
            }
        }
      }
    },    
  }
  qcloud.request(obj);
}

function uploadPic(that,wxUrl){
  if(wxUrl != undefined){
    wx.uploadFile({
        url:'https://www.wowyou.cc/api/upload/uploadOne', 
        filePath:wxUrl,
        name:'image',
        method:'POST',
        success:function(res){
            console.log(JSON.parse(res.data).data+"123123");
            var picUrl = JSON.parse(res.data).data;
                that.setData({
                imgUrl: 'https://www.wowyou.cc/'+picUrl,
              });                          
        },
        error:function(res){
                console.log(res);
        }
    });  
  }
}


function creatActivity(that,uData){
  var t = that;
  console.log(uData);
  var obj = {
    url:'https://www.wowyou.cc/api/activity/create',
    method:"POST",
    data:uData,
    success:function(e){
              console.log(e);
      if(e.data.code == 0){
        console.log(123);
        console.log(e);
      }
    },    
  }
  qcloud.request(obj);  
}