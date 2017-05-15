var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');
var config = require('../../config');
var toast = require('../../utils/toast');
var pageIndex = 1;
var currentPage = 999;
Page({
onPullDownRefresh: function() {
    wx.showLoading({
    title: '加载中...',
    })
    pageIndex = 1;
    getList(this);
 },
  // 上拉加载回调接口
    onReachBottom: function () {
        if(pageIndex < this.data.totalPage){
            console.log('pageIndex++');
            console.log(this.data.totalPage);
            console.log('this.data.totalPage');
            pageIndex ++;  
        } 
            wx.showLoading({
            title: '加载中...',
            });
            getList(this);     
    },    
    data: {       
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://p0.so.qhimgs1.com/bdr/_240_/t01e10eb3ca17c7e420.jpg',
            'http://p2.so.qhimgs1.com/bdr/_240_/t01c064057f29a800de.jpg'
        ],
        imgTexts: initImageTexts(),
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 1000,
        imageText: (initImageTexts())[0],

        // filtrate
        subMenueContent: initSubMenuContent(),
        filtrate: filtrate(),
        subMenuDisplay: initSubMenuDisplay(),
        filtrateIndex: 0,

        activityList:[],
        lat:'',
        lng:'',
        
    },
    onLoad: function (options) {
        getScrollerHeight(this);
        wxLoagin(qcloud);
        // getUserInfo(qcloud, "https://www.wowyou.cc/api/user/userinfo");
        getLocation(this);
    },
    onShow:function(){
        // getList(this);
    },

    //----------------一级菜单事件-------------------//
    tapMainMenu: function (e) {
        //      获取当前显示的一级菜单标识
        var index = parseInt(e.currentTarget.dataset.index);
        console.log(index+":index");
        this.data.filtrateIndex = index;
        // 生成数组，全为hidden的，只对当前的进行显示
        var newSubMenuDisplay = initSubMenuDisplay();
        //      如果目前是显示则隐藏，反之亦反之。同时要隐藏其他的菜单
        if (this.data.subMenuDisplay[index] == 'hidden') {
            newSubMenuDisplay[index] = 'show';
        } else {
            newSubMenuDisplay[index] = 'hidden';
        }
        this.setData({
            filtrateArrIndex:index,
            subMenuDisplay: newSubMenuDisplay
        });
    },
    //----------------二级菜单事件-------------------//
    tapSubMenu: function (e) {
        var filtrateIndex = this.data.filtrateIndex;
        // 隐藏所有一级菜单
        this.setData({
            subMenuDisplay: initSubMenuDisplay()
        });
        var subMenuIndex = e.currentTarget.dataset.index;
        var subMenuContent = this.data.subMenueContent;
        var filtrate = this.data.filtrate;
        filtrate[filtrateIndex] = subMenuContent[filtrateIndex][subMenuIndex-1];
        

         var index = parseInt(e.currentTarget.dataset.index);
          console.log(index+":subindex");
          if(this.data.filtrateArrIndex == 0){
            this.setData({
                filtrate: filtrate,
                atype:index
            });
          }else{
          
          }
          getList(this);
        console.log(this.data.filtrateArr+":filtrateArr");
    },


    testChange: function (e) {
        var imageTextIndex = e.detail.current;
        this.setData({
            imageText: this.data.imgTexts[imageTextIndex],
        });

    },
    lookForDetails: function (e) {
        console.log(e);console.log('lookForDetails e');
        wx.navigateTo({
            url: '../talentactivity/talentactivity?actId='+e.currentTarget.dataset.id,
        })
    },
    ntType: function () {
        wx.navigateTo({
            url: '../benefit-type/benefit-type',
        })
    },


})


//----------------二级菜单显示状态初始化-------------------//
function initSubMenuDisplay() {
    return ['hidden', 'hidden', 'hidden'];
}

//----------------一级菜单初始化--------------------------//
function filtrate() {
    return ['类型', '地区', '综合排序'];
}

function initSubMenuContent() {
    return [
        ['好吃', '好喝', '好玩', '好赚'],
        ['福田区', '罗湖区', '龙岗区', '盐田区', '大鹏新区', '龙华新区', '光明新区', '南山区', '宝安区', '坪山新区'],
        ['综合排序', '折扣最高', '价格最低']
    ];
}

function initImageTexts() {
    return [
        '4000元欧洲巴黎5日游',
        '2.5折四海一家开吃',
        '幸福西饼新季蛋糕免费送！',];
}

//  微信登录
function wxLoagin(qCloud) {
    qcloud.setLoginUrl(config.service.loginUrl);
    qcloud.login({
        success: function (userInfo) {
            console.log('登录成功', userInfo);
        },
        fail: function (err) {
            console.log('登录失败', err);
        }
    });
}

function getUserInfo(qcloud, url) {
    var obj = {
        url: url,
        success(res) {
            console.log(res);console.log("res.data.data.is_vip");
            if (res.data.code == 0) {
                wx.setStorage({
                    key: 'master_status',
                    data: res.data.data.master_status,       
                    
                    success: function (res) {
                        console.log(res)
                    }
                });
            }
        },
        error(res) {
            console.log(JSON.stringify(res));
            console.log('注册失败');
        },
    }
    qcloud.request(obj);
}
function getList(that) {
    wx.showLoading({
        title: '加载中',
    })
    var atype = that.data.atype;
    var data;
    if (atype != undefined){
        data={
            districtid:105,
            lat:that.data.lat,
            lng:that.data.lng,
            page:pageIndex,
            atype:that.data.atype
        }
    }else{
        data={
            districtid:105,
            lat:that.data.lat,
            lng:that.data.lng,
            page:pageIndex,
        }
    }
    var obj = {
        login:true,
        data,
        url: 'https://api.wowyou.cc/v1/activity/activityHome',
        success: function (e) {
             wx.stopPullDownRefresh();
            console.log(e); console.log('console.log(e);');
            if(e.data.code == 0 ){
                if(e.data.data.current_page <= Math.ceil(e.data.data.total/e.data.data.per_page) ){
                    console.log(11111111111111111111111111111111111111111111111);
                    currentPage = e.data.currentPage;
                    if(e.data.data.current_page != 1 && e.data.data.data.length !=0){
                        that.setData({
                            activityList:that.data.activityList.concat(e.data.data.data),
                            totalPage:getTotalPage(e.data.data.total,e.data.data.per_page)
                        });  
                    }else if(e.data.data.current_page == 1 && e.data.data.data.length ==0){// 第一页就没有数据的
                        that.setData({
                            activityList:e.data.data.data,
                            totalPage:getTotalPage(e.data.data.total,e.data.data.per_page)
                        });                          
                    }else{
                        that.setData({
                            activityList:e.data.data.data,
                            totalPage:getTotalPage(e.data.data.total,e.data.data.per_page)
                        });  
                    }                  
                }else{
                    if(Math.ceil(e.data.data.total/e.data.data.per_page) == 0){
                        that.setData({
                            activityList:e.data.data.data,
                            totalPage:getTotalPage(e.data.data.total,e.data.data.per_page)
                        });  
                    }
                    toast.showToast({
                        context: that,
                        title: "没有更多了"
                    });
                }
            }
 console.log(that.data); console.log('that.data');
              wx.hideLoading()
        },
    }
    console.log(obj);console.log('obj');
    qcloud.request(obj);
}

function getLocation(that){
    wx.getLocation({
        success: function(res) {
            // var latitude = res.latitude
            // var longitude = res.longitude
            // var speed = res.speed
            // var accuracy = res.accuracy
            that.setData({
                lat:res.latitude,
                lng:res.longitude            
            });
            getList(that);
            console.log(res);console.log("位置信息");
        },
        fail:function(res){            
            getList(that);
            console.log(res);console.log("打开定位失败");            
        }
    })    
}

function getTotalPage(len,per){
    console.log(len);console.log('len');
    var totalPage = (len/per);
    totalPage = Math.ceil(totalPage);
    console.log(totalPage);console.log('totalPage');
    return totalPage;
}

function getScrollerHeight(that){
    
    wx.getSystemInfo({
        success: function(res) {
            console.log(res.windowHeight)
            that.setData({
                scrollerHeight:(res.windowHeight-245),
            });
        }
})
}
