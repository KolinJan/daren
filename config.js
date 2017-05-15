/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://api.wowyou.cc/v1';
// https://qiuqiuo.com/v1/index.php

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/user/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/tunnel`,
    }
};

module.exports = config;