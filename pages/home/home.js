var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var config = require('../../config');
Page({
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://p0.so.qhimgs1.com/bdr/_240_/t01e10eb3ca17c7e420.jpg',
      'http://p2.so.qhimgs1.com/bdr/_240_/t01c064057f29a800de.jpg'
    ],
    imgTexts:initImageTexts(),
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000, 
    imageText:(initImageTexts())[0],

// filtrate
    subMenueContent:initSubMenuContent(),
    filtrate:filtrate(),
    subMenuDisplay:initSubMenuDisplay(),
    filtrateIndex:0    
  },
    onLoad:function(options){
        console.log(111);
    // qcloud.request({
    //   url: 'http://wowyou.cc/api/user/login',
    //   success: function(res){ console.log(222);
    //     console.log(res);
    //     // if(res.data && res.data.code && res.data.code == 0){
    //     // }
    //   },
    //   error: function(error){console.log(333);
    //     console.log(error);
    //   }
    // })
    console.log(config)
    qcloud.setLoginUrl(config.service.loginUrl);
    qcloud.login({
        success: function (userInfo) {
            console.log('登录成功', userInfo);
        },
        fail: function (err) {
            console.log('登录失败', err);
        }
    });
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
      var filtrateIndex = this.data.filtrateIndex;
        // 隐藏所有一级菜单
        this.setData({
            subMenuDisplay: initSubMenuDisplay()
        });
        var subMenuIndex = e.currentTarget.dataset.index;
        var subMenuContent = this.data.subMenueContent;
        var filtrate = this.data.filtrate;
        filtrate[filtrateIndex] = subMenuContent[filtrateIndex][subMenuIndex];
        this.setData({
            filtrate:filtrate,
        });
    },


    testChange:function(e){
        var imageTextIndex = e.detail.current;
        this.setData({
            imageText:this.data.imgTexts[imageTextIndex],
        });

    },
    lookForDetails:function(){
        wx.navigateTo({
            url: '../talentactivity/talentactivity' 
        })
    },
    ntType:function(){
        wx.navigateTo({
          url: '../benefit-type/benefit-type',
        })
    }                  
 
})


//----------------二级菜单显示状态初始化-------------------//
function initSubMenuDisplay() {
    return ['hidden', 'hidden', 'hidden'];
}

//----------------一级菜单初始化--------------------------//
function filtrate(){
    return ['类型','地区','综合排序'];
}

function initSubMenuContent(){
    return [
        ['好吃','好喝','好玩','好赚'],
        ['福田区','罗湖区','龙岗区','盐田区','大鹏新区','龙华新区','光明新区','南山区','宝安区','坪山新区'],
        ['综合排序','折扣最高','价格最低']
    ];    
}

function initImageTexts(){
    return [
    '4000元欧洲巴黎5日游',
    '2.5折四海一家开吃',
    '幸福西饼新季蛋糕免费送！',];
}