// pages/addr-add/addr-add.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var config = require('../../config');
var tcity = require("../../utils/citys.js");
var app = getApp();
Page({
  data:{
    location:'点击编辑',
    name:'',
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
    provinceid:'',
    cityid:'',
    districtid:"",
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
          countyid: cityData[val[0]].sub[0].sub[0].code,
          countys:countys,
          values: val,
          value:[val[0],0,0]
        })
        console.log({
          province: this.data.provinces[val[0]],
          provinceid:cityData[val[0]].code,
          city: cityData[val[0]].sub[0].name,
          cityid: cityData[val[0]].sub[0].code,
          citys:citys,
          county: cityData[val[0]].sub[0].sub[0].name,
          countyid: cityData[val[0]].sub[0].sub[0].code,
          countys:countys,
          values: val,
          value:[val[0],0,0]
        });
        
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
          county: cityData[val[0]].sub[val[1]].sub[0].name,
          countys:countys,
          values: val,
          value:[val[0],val[1],0]
        })
        return;
      }
      if(val[2] != t[2]){
        console.log('county no');
        this.setData({
          county: this.data.countys[val[2]],
          values: val
        })
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
      'county':cityData[0].sub[0].sub[0].name
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
    save:function(){
    }
})

function openMap(that){
  console.log(that);
  wx.chooseLocation({
    success:function(e){
            console.log(e);
      that.data.name = e.name;
      //             console.log(that.data.addrs);
      that.setData({
        name:that.data.name
      });
    },
    cancel:function(e){
    },
    fail:function(e){
    },  
  });
}
function upLoad(){
  var obj={
    data:{

    }
  }
  qCloud.request(obj);
}