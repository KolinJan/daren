// pages/talentactivitys-edit/talentactivitys-edit.js
Page({
  data:{
        date: '2016-09-01',
        inputValue:'',
        checkBoxShow: [false,false,false,false,false,false,],
        addrs:getAddr(),
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
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
  openMap:function(e){
    openMap(this);
  },
  getImgFromPhone:function(e){
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imgUrl:tempFilePaths,
        });
      }
    })  
  }
})

function getAddr(){
  return [
    {addr:'广东省深圳市罗湖区田贝三路粤大珠宝城4楼401',phone:'0755-28876665',value:'0'},
    {addr:'广东省深圳市罗湖区田贝三路粤大珠宝城4楼401',phone:'0755-28876665',value:'1'},
    ];
}

function openMap(that){
  console.log(that);
  var index = that.data.addrs.length;
  wx.chooseLocation({
    success:function(e){
            console.log(e);
      that.data.addrs[index] = e.name;
                  console.log(that.data.addrs);
      that.setData({
        addrs:that.data.addrs
      });
    },
    cancel:function(e){
    },
    fail:function(e){
    },  
  });
}
