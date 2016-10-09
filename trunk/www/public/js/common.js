"use strict";

var $_alert = function $_alert(msg, cb) {
  alert(msg);
  cb && cb();
};

/*
  进入绑定注册流程
  1：跳转绑定页面
 */
var $_bind_or_register = function $_bind_or_register() {
  var oldHref = window.encodeURIComponent(window.location.href);
  window.location.href = $_server + "/bind_phone.html?redirectUrl=" + oldHref;
};

/*
  绑定或者注册成功
  1：获取url参数，是否存在redirectUrl，如果存在，则返回该页面，否则关闭窗口
*/
var $_bind_or_register_success = function $_bind_or_register_success() {
  var redirectUrl = WebUtils.getUrlParam("redirectUrl");
  redirectUrl = WebUtils.delUrlParam('state', redirectUrl);
  redirectUrl = WebUtils.delUrlParam('code', redirectUrl);

  if (redirectUrl) {
    alert(redirectUrl);
    window.location.href = redirectUrl;
  } else {
    wx.closeWindow();
  }
};

/*
  用户登录
 */
var $_login = function $_login(state, scope) {
  /* 调用微信重定向进行重定向登录 */
  $_http('/wechat/api/oauth2_url', 'get', 'text', {
    url: window.location.href,
    state: state,
    scope: scope
  }, function (loginUri) {
    window.location.href = loginUri;
  });
};

new WechatJs().ready(function () {
  $(function () {
    if (WebUtils.getUrlParam("code") && WebUtils.getUrlParam("code") !== '' && WebUtils.getUrlParam("state") == 'default') {
      /* 已经授权登录 */
      $.ajax({
        url: $_server + '/wechat_login/code',
        data: {
          code: WebUtils.getUrlParam('code')
        },
        dataType: 'text',
        type: 'get',
        success: function success(ret) {
          WebUtils.changeParam('code', '');
        },
        error: function error(ret) {
          $_bind_or_register();
        }
      });
    } else {
      if (window.$_ready) {
        window.$_ready();
      }
    }
  });
});

/*
  The function is a Promise function
  s_selector 模板文件所在的选择器
  t_selector 目标文件所在的选择器
  data => string | object

*/
var $_template = function $_template(s_selector, t_selector, data) {
  return new Promise(function (resolve, reject) {
    var ret = typeof data === "string" ? null : data;

    if (ret == null) {
      $_http(data, "get", "json", {}, function (server_data) {
        $_template(s_selector, t_selector, server_data).then(function () {
          resolve();
        });
      });
    } else {
      var $element = $(s_selector);
      var render = template.render($element.html());
      var t_html = render({
        data: data
      });
      $(t_selector).append(t_html);
      resolve();
    }
  });
};

template.helper('moneyFormat', function (str, qz) {
  str = parseFloat(str) / 100;
  str = "" + str;
  var newStr = "";
  var count = 0;

  if (str.indexOf(".") == -1) {
    for (var i = str.length - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr;
      }
      count++;
    }
    str = newStr + ".00"; //自动补小数点后两位
  } else {
    for (var i = str.indexOf(".") - 1; i >= 0; i--) {
      if (count % 3 == 0 && count != 0) {
        newStr = str.charAt(i) + "," + newStr;
      } else {
        newStr = str.charAt(i) + newStr; //逐个字符相接起来
      }
      count++;
    }
    str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
  }
  return str;
});

template.helper('dateFormat', function (date, format) {
  date = new Date(parseInt(date));

  var map = {
    "M": date.getMonth() + 1, //月份
    "d": date.getDate(), //日
    "H": date.getHours(), //小时
    "m": date.getMinutes(), //分
    "s": date.getSeconds(), //秒
    "q": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  if (format == null || format == '') {
    format = 'yyyy-MM-dd HH:mm:ss';
  }
  format = format.replace(/([yMdHmsqS])+/g, function (all, t) {
    var v = map[t];
    if (v !== undefined) {
      if (all.length > 1) {
        v = '0' + v;
        v = v.substr(v.length - 2);
      }
      return v;
    } else if (t === 'y') {
      return (date.getFullYear() + '').substr(4 - all.length);
    }
    return all;
  });
  return format;
});

/*
  http工具类
*/
var $_http = function $_http(url, /* 数据提交/获取地址 */
type, /* 请求方式：[GET | POST | PUT | DELETE] ，default GET*/
dataType, /* 数据类型： [JSON | TEXT | HTML | XML]，default JSON*/
data, /* 提交数据 */
_success, /* 成功回调函数 */
error /* 请求失败回调函数 */
) {
  $.ajax({
    url: $_server + url,
    type: type || "GET",
    dataType: dataType || "JSON",
    data: data || {},
    success: function success(ret) {
      _success(ret);
    },
    statusCode: {
      404: function _() {
        $_alert('网络连接错误，请重新尝试');
      },
      500: function _(errRet) {
        errRet = errRet.responseText;
        try {
          errRet = JSON.parse(errRet);
          var newErrRet = {};
          for (var i = 0; i < errRet.length; i++) {
            var errRetItem = errRetItem[i];
            for (var key in errRetItem) {
              newErrRet[key] = errRetItem[key];
            }
          }
          error(newErrRet);
        } catch (e) {
          if (errRet === 'not_login') {
            /* 尚未登录，重定向进行登录 */
            $_login();
          } else {
            $_alert(errRet);
          }
        }
      }
    }
  });
};