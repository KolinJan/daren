// pages/cards-bag/cards-bag.js
Page({
  data:{
    cards:getCards()
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
  changeStatus:function(e){
    console.log(e);
    wx.showModal({
      title: "提示",
      content: "确定立即使用 '发表速度与激情8观影感想' 卡券? ",
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})

function getCards(){
  return [
    {cardId:1,cardName:"发表速度与激情8观影感想",bonus:"30",status:"立刻使用",cardType:1},
    {cardId:2,cardName:"幸福西饼1磅黑森林蛋糕布心店",bonus:"0",status:"立刻使用",cardType:2},
    {cardId:3,cardName:"百事可乐朋友圈推广",bonus:"30",status:"立刻使用",cardType:1}
  ];
}