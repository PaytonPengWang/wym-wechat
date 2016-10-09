"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WechatJs = function () {
    function WechatJs() {
        _classCallCheck(this, WechatJs);
    }

    _createClass(WechatJs, [{
        key: 'ready',
        value: function ready(callback) {
            $.ajax({
                url: $_server + '/wechat/api/config',
                data: {
                    url: window.location.href,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'].join(',')
                },
                dataType: 'json',
                type: 'get',
                success: function success(ret) {
                    // 微信权限
                    wx.config(ret);
                    wx.ready(callback);
                }
            });
        }
    }]);

    return WechatJs;
}();