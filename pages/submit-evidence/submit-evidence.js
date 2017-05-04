
Page({
  data:{
    sample:sample(),
    tempFilePaths1:'',
    tempFilePaths2:''    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
        console.log(this);
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
  ntMine:function(){
    wx.navigateTo({
      url: '../mine/mine',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  jumpToHome:function(){
    wx.switchTab({
      url: '../home/home'
    })
  },  
  chooseimage:function(e){
    var that = this;
    console.log(e.target.dataset.params);
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
                  console.log(this);
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        if(e.target.dataset.params == 1){
        var tempFilePaths1 = res.tempFilePaths          
          that.setData({
            tempFilePaths1:tempFilePaths1,
            show1:'block'
          });
        }else{
          if(that.data.tempFilePaths2 == ''){
            that.data.tempFilePaths2 = res.tempFilePaths;
            that.setData({
              tempFilePaths2:that.data.tempFilePaths2,
              show2:'block'
            });                
          }else{
            var tempFilePaths3 = res.tempFilePaths;
            that.setData({
              tempFilePaths3:tempFilePaths3,
              show3:'block'
            }); 
          }   
        }
      }
    })
  },
  smallToBig:function(e){
    console.log(e);
    var index = e.target.dataset.params;
    this.setData({
      maskSrc:this.data.sample[index],
      maskDisplay:'maskBlock',
    });
  },
  maskCancel:function(e){
    console.log(123);
    this.setData({
      maskDisplay:'maskNone',
      maskSrc:'',
    });
  },  
})
function sample(){
  return [
    "../../imgs/sample-1.jpg",
    "../../imgs/sample-2.jpg"
  ];
}

