// pages/addr-add/addr-add.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var config = require('../../config');
var tcity = require("../../utils/citys.js");
var toast = require('../../utils/toast');
var app = getApp();
Page({
  data:{
    location:'点击编辑',
    name:'',
    complate:0,
    // ······························三级联动开始······························
    provinces: [],
    province: "",
    citys: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: false,
    provinceid:"1",
    cityid:"2",
    districtid:"3",
    lat:222.222222,
    lng:222.222222,
    is_default:1,
  },
    bindChange: function(e) {
      console.log(e);
      var val = e.detail.value
      var t = this.data.values;
      var cityData = this.data.cityData;
      console.log(cityData);
      if(val[0] != t[0]){
        console.log('province no ');
        const citys = [];
        const countys = [];

        for (let i = 0 ; i < cityData[val[0]].sub.length; i++) {
          citys.push(cityData[val[0]].sub[i].name)
        }
        for (let i = 0 ; i < cityData[val[0]].sub[0].sub.length; i++) {
          countys.push(cityData[val[0]].sub[0].sub[i].name)
        }
        console.log(this.data.provinces[val[0]]);
        this.setData({
          province: this.data.provinces[val[0]],
          provinceid:cityData[val[0]].code,
          city: cityData[val[0]].sub[0].name,
          cityid: cityData[val[0]].sub[0].code,
          citys:citys,
          county: cityData[val[0]].sub[0].sub[0].name,
          // districtid: cityData[val[0]].sub[0].sub[0].code,
          countys:countys,
          values: val,
          value:[val[0],0,0],
        })
        console.log({
          province: this.data.provinces[val[0]],
          provinceid:cityData[val[0]].code,
          city: cityData[val[0]].sub[0].name,
          // cityid: cityData[val[0]].sub[0].code,
          citys:citys,
          county: cityData[val[0]].sub[0].sub[0].name,
          // districtid: cityData[val[0]].sub[0].sub[0].code,
          countys:countys,
          values: val,
          value:[val[0],0,0]
        });

        console.log('三级联动时间后的数据');
        
        return;
      }
      if(val[1] != t[1]){
        console.log('city no');
        const countys = [];

        for (let i = 0 ; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
          countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
        }
        
        this.setData({
          city: this.data.citys[val[1]],
          cityid: cityData[val[0]].sub[val[1]].code,         
          county: cityData[val[0]].sub[val[1]].sub[0].name,
          countys:countys,
          values: val,
          value:[val[0],val[1],0]
        })
        console.log({
          city: this.data.citys[val[1]],
          cityid: cityData[val[0]].sub[val[1]].code,          
          county: cityData[val[0]].sub[val[1]].sub[0].name,
          countys:countys,
          values: val,
          value:[val[0],val[1],0],
          test:cityData[val[0]]
        });        
        return;
      }
      if(val[2] != t[2]){
        console.log('county no'+cityData[val[0]].sub[0].sub[0].code);
        this.setData({
          county: this.data.countys[val[2]],
          districtid: cityData[val[0]].sub[val[1]].sub[val[2]].code,          
          values: val
        })
        console.log({
          county: this.data.countys[val[2]],
          districtid: cityData[val[0]].sub[val[1]].sub[val[2]].code,          
          values: val,
          test: cityData[val[0]].sub[0]
        });         
        return;
      }
  },
    open:function(){
    this.setData({
      condition:!this.data.condition
    })
  },
    onLoad: function () {
    console.log("onLoad");
    var that = this;
    
    tcity.init(that);

    var cityData = that.data.cityData;

    
    const provinces = [];
    const citys = [];
    const countys = [];

    for(let i=0;i<cityData.length;i++){
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0 ; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0 ; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'citys':citys,
      'countys':countys,
      'province':cityData[0].name,
      'city':cityData[0].sub[0].name,
      'county':cityData[0].sub[0].sub[0].name,
      'inputAbled':'',
      'complate':1
    })
    console.log('初始化完成');
  },
// ······························三级联动结束······························
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
  chooseLocation:function(){
    openMap(this);
  },
  formSubmit:function(e){
    console.log(e);console.log('submit方法的e');
      var obj = {
        'consignee':e.detail.value.name,
        'provinceid':this.data.provinceid,
        'cityid':this.data.cityid,
        'districtid':this.data.districtid,
        'lat':this.data.lat,
        'lng':this.data.lng,
        'mobile':e.detail.value.phone,
        'address':this.data.name,
        'is_default':this.data.is_default
      }
      checkData(obj);
      console.log(obj);
      console.log('obj');
  },
  checkboxChange:function(e){
    console.log(e.detail.value[0]);
    console.log('chickbox结果');
    if(e.detail.value[0] == 1){
        this.data.is_default = 1;
        console.log( this.data.is_default);
    }else{
      this.data.is_default = 1;
    }
  }
})

function openMap(that){
toast.showToast({
    context: that,
    title: '正在打开地图，请稍后...'
})
  console.log(that);
  wx.chooseLocation({
    success:function(e){
            console.log(e);
      var lat = e.latitude;
      var lng = e.longitude;
      console.log(lat);
      console.log(lng);
      that.data.name = e.name;
      that.data.lat = lat;
      that.data.lng = lng;
      that.setData({
        name:that.data.name,
        lat:lat,
        lng:lng
      });
    },
    cancel:function(e){
      wx.showModal({
        title: '提示',
        content: '您还未选择地址',
        showCancel:false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    fail:function(e){
      wx.showModal({
        title: '提示',
        content: '您还未选择地址',
        showCancel:false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })      
    },  
  });
}
function checkData(obj){
  if(obj['mobile'] == ''){
    toastError('请填写联系方式');
    return;
  }
  if(obj['address'] == ''){
    toastError('请填写详细地址');
    return;
  }         
  if(obj['consignee'] == ''){
    toastError('请输入活动简介');
    return;
  }
  if(obj['provinceid'] == ''){
    toastError('请输入完整的信息');
    return;
  }
  if(obj['cityid'] == ''){
    toastError('请输入完整的信息');
    return;
  }
  if(obj['districtid'] == ''){
    toastError('请输入完整的信息');
    return;
  }
  upLoad(obj); 
}
function upLoad(obj){
    var resUpload = {
      login: true,
      url: "https://api.wowyou.cc/api/v1/user/addressAdd",
      method:"POST",      
      data:obj,
      success(res) {
        console.log(res);console.log('res');
        if(res.data.code == 0){
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
            })
        }else{
          wx.showModal({
            showCancel:false,            
            title: '错误',
            content: res.data.msg,
            success: function(res) {
            }
          })
        }
      },
    }
  qcloud.request(resUpload);
}
function toastError(str){
  wx.showToast({
    title: str,
    icon:'loading',
    duration: 500
  })
}