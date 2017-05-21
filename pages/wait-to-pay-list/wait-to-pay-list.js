// pages/wait-to-pay-list/wait-to-pay-list.js
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
Page({
  data:{
        subMenuDisplay:initSubMenuDisplay(),
        subMenueContent:initSubMenuContent(),
        filtrate:filtrate(),
        titleShow:'全部'    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    getList(99,this);
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
  pay:function(e){
    console.log(e.currentTarget.dataset.oid);
    var order_id=e.currentTarget.dataset.oid;
    pay(this,order_id);
  },
//----------------一级菜单事件-------------------//
    tapMainMenu: function(e) {
//      获取当前显示的一级菜单标识
        var index = parseInt(e.currentTarget.dataset.index);
        this.data.filtrateIndex = index;
        // 生成数组，全为hidden的，只对当前的进行显示
        var newSubMenuDisplay = initSubMenuDisplay();
//      如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
        if(this.data.subMenuDisplay[index] == 'hidden') {
            newSubMenuDisplay[index] = 'show';
        } else {
            newSubMenuDisplay[index] = 'hidden';
        }
        this.setData({
            subMenuDisplay: newSubMenuDisplay
        });
    }, 
//----------------二级菜单事件-------------------//
    tapSubMenu: function(e) {
      console.log(this.data.filtrateIndex);
      var filtrateIndex = this.data.filtrateIndex;
        // 隐藏所有一级菜单
        this.setData({
            subMenuDisplay: initSubMenuDisplay()
        });
        var subMenuIndex = e.currentTarget.dataset.index;
        var titleShow = e.currentTarget.dataset.titleshow;
        console.log(e);
        console.log(subMenuIndex+":二级菜单数值");
        var subMenuContent = this.data.subMenueContent;
        var filtrate = this.data.filtrate;
        // filtrate[filtrateIndex] = subMenuContent[filtrateIndex][subMenuIndex];
        this.setData({
            // filtrate:filtrate,
            titleShow:titleShow
        });
        console.log(subMenuIndex+":params");
        getList(subMenuIndex,this);
    },
    lookForDetails:function(e){
        console.log(e);console.log('点击事件范湖i')
        var status = e.currentTarget.dataset.status;
            var id = e.currentTarget.dataset.id;
            var aid = e.currentTarget.dataset.aid;        
        if(status == 2){
            wx.navigateTo({
            url: '../upload-evidence/upload-evidence?aid='+aid,
            })
        }else{
            wx.navigateTo({
            url: '../cards-bag/cards-bag?id='+id+"&aid="+aid,
            })
        }
    },


    testChange:function(e){
        console.log(e.detail.current);
        var imageTextIndex = e.detail.current;
        this.setData({
            imageText:this.data.subMenueContent[imageTextIndex],
        });

    },    
})
//----------------二级菜单显示状态初始化-------------------//
function initSubMenuDisplay() {
    return ['hidden', 'hidden', 'hidden'];
}

//----------------一级菜单初始化--------------------------//
function filtrate(){
    return ['全部'];
}

function initSubMenuContent(){
    return [
        ['全部','已支付的活动','未支付的活动','过期的活动'],
    ];    
}



function getList(paramsInt,that){
    var myData;
    console.log(paramsInt+"getList里的paramsInt");
    if(paramsInt != 99){
        myData={
            state:paramsInt
        }
    }
    var obj = {
        login:true,
        url: 'https://api.wowyou.cc/api/v1/order/myOrder',
        data:myData,
        success: function (e) {
            console.log(e); console.log('console.log(e);');
            if(e.data.code == 0 ){
                that.setData({
                    activityList:e.data.data,
                });
            }
            console.log(that.data); console.log('that.data');
        },
    }
    console.log(JSON.stringify(obj));
    console.log('JSON.stringify(obj)')
    qcloud.request(obj);  
}


function pay(that,oid){
  var obj = {
    login:true,
    url:'https://api.wowyou.cc/api/v1/order/pay',
    data:{
      order_id:oid
    },
    success:function(e){
      console.log(e);
      wxPay(e.data);
    },
    fail:function(e){
      console.log(e);
    },
  }
      qcloud.request(obj); 
}

function wxPay(params){
  wx.requestPayment({
   'timeStamp': params.timeStamp+'',
   'nonceStr': params.nonceStr,
   'package': params.package,
   'signType': 'MD5',
   'paySign': params.sign,
   'success':function(res){
     console.log(res);
     console.log('调用微信接口成功');

   },
   'fail':function(res){
     console.log(res);
     console.log('调用微信接口失败');
   }
})
}