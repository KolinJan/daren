var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
Page({
  data:{
        subMenuDisplay:initSubMenuDisplay(),
        subMenueContent:initSubMenuContent(),
        filtrate:filtrate(),
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    getList(0,this);
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
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
        console.log(subMenuIndex+":二级菜单数值");
        var subMenuContent = this.data.subMenueContent;
        var filtrate = this.data.filtrate;
        filtrate[filtrateIndex] = subMenuContent[filtrateIndex][subMenuIndex];
        this.setData({
            filtrate:filtrate,
        });
        
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
            imageText:this.data.imgTexts[imageTextIndex],
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
        ['全部','未使用','截图尚缺','已完成'],
    ];    
}

function getList(aType,that){
    
    if(aType != 0) var data = {status:aType};

    console.log('刷新数据');
    var obj = {
        login:true,
        url: 'https://api.wowyou.cc/api/v1/user/myJoin',
        // data:{status:''},
        data:data,
        success: function (e) {
            console.log(e); console.log('console.log(e);');
            if(e.data.code == 0 ){
                that.setData({
                    listDetails:e.data.data,
                });
            }else{
                that.setData({
                    listDetails:"",
                }); 
            }
            console.log(that.data); console.log('that.data');
        },
    }
    qcloud.request(obj);  
}
