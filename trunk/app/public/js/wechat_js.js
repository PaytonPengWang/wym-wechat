"use strict";

class WechatJs {
    ready(callback){
        $.ajax({
            url : $_server+'/wechat/api/config',
            data : {
                url : window.location.href,
                jsApiList : ['onMenuShareTimeline','onMenuShareAppMessage'].join(',')
            },
            dataType : 'json',
            type : 'get',
            success : function(ret){
                // 微信权限
                wx.config(ret);
                wx.ready(callback);
            }
        });
    }

}
