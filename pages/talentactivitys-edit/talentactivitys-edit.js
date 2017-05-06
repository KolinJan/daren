// pages/talentactivitys-edit/talentactivitys-edit.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var toast = require('../../utils/toast');
Page({
  data:{
        up_deadline: '2016-09-01',
        inputValue:'',
        checkBoxShow: [false,false,false,false,false,false],
        addrIsShow:0,
        aType:['美食类','游玩类','饮品类','娱乐类'],
        up_grade:5,
        up_scrore:60,
        ids:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
     getAddrList(this);
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
        this.setData({
          aTypeRadioIndex:e.detail.value
        });    
  },
  checkboxChange: function(e) {
    console.log(e);console.log("checkbox");
    var that = this;
    // console.log(this.data.checkboxBaseNum%2);
    // this.data.checkboxBaseNum ++;
    console.log(that.data.checkBoxShow[index]);    
    var index = e.currentTarget.id;
    var clickResult = !that.data.checkBoxShow[index];
    that.data.checkBoxShow[index] = clickResult;
    console.log(that.data.checkBoxShow[index]);
    if(that.data.checkBoxShow[index]){
        this.data.ids.push(e.target.id);
    }else{
      for(var i = 0;i<this.data.ids.length;i++){
        if(this.data.ids[i] == e.target.id){
            this.data.ids.splice(i, 1);
        }
      }
    }
    console.log(this.data.ids);
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
                addrs:e.data.data[i],
                addrIsShow:1
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
                upImg:picUrl
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
  console.log(uData);console.log("uData");
  uData["type"] = 1;
  uData["ids"] = that.data.ids;
  // uData["ids"] = 
  var obj = {
    url:'https://www.wowyou.cc/api/activity/create',
    method:"POST",
    data:uData,
    success:function(e){
              console.log(e);
      if(e.data.code == 0){
        toast.showToast({
            context: that,
            title: "发布成功"
        })
        wx.switchTab({
          url:"../home/home"
        })
      }else if(e.data.code == -1){
        toast.showToast({
            context: that,
            title: "表单数据需填写完整"
        })
      }
    },    
  }
  qcloud.request(obj);  
}