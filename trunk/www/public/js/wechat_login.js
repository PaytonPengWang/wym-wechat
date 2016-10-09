"use strict";

var wechat_login;

if (!WebUtils.getUrlParam("_token_") && !WebUtils.getUrlParam("code")) {
    /* 获取token，如果token不存在，则尚未登录 - 尚未授权，尚未登录*/

    $.ajax({
        url: '/wechat/api/oauth2_url',
        data: {
            url: window.location.href
        },
        dataType: 'text',
        type: 'get',
        async: true,
        success: function success(ret) {
            window.location.href = ret;
        }
    });
} else if (WebUtils.getUrlParam("code")) {
    /* 已经授权登录 */
    $.ajax({
        // TODO:需要配置登录路径
        url: '/wechat/login',
        data: {
            code: WebUtils.getUrlParam('code')
        },
        dataType: 'text',
        type: 'get',
        async: true,
        success: function success(ret) {
            WebUtils.changeParam('_token_', ret);
        },
        error: function error(ret) {
            // TODO :
            /*
            1：进入绑定页面，提示绑定成功，点击确定关闭
            2：进入绑定页面，提示成功，点击确定返回之前的路径，回到当前页面的时候，需要在参数上添加_token_参数
            */
            /*app.bind(window.location.href);*/
        }
    });
}