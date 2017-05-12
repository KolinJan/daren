// pages/evaluate/evaluate.js
Page({
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/star/normal.png',
    selectedSrc: '../../images/star/selected.png',
    halfSrc:'../../images/star/half.png',
    key: 3,//评分
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
  // 提交表单
  eva_input:function(e){
    var that=this
    var form=e.detail.value
    form.star=that.data.key
    console.log(form)
  },
  //点击右边,半颗星
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
     if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
    //只有一颗星的时候,再次点击,变为0颗
       key = 0;
    }
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    this.setData({
      key: key
    }) 
  }
})