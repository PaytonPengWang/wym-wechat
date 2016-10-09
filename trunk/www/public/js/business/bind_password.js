'use strict';

window.$_ready = function () {
  var $password = $('#password'),
      $bind = $('#bind');

  $bind.on('click', function () {
    var strPassword = $password.val();
    if (strPassword == null || strPassword == '') {
      $_alert('请输入登录密码', function () {
        $password.focus();
      });
    } else {
      strPassword = md5(strPassword);
      $_http('/wechat_login/save?code=' + WebUtils.getUrlParam('code'), 'put', 'text', {
        mobile: WebUtils.getUrlParam('mobile'),
        password: strPassword
      }, function (ret) {
        window.location.href = $_server + "/bind_success.html?state=bind_phone&redirectUrl=" + window.encodeURIComponent(WebUtils.getUrlParam('redirectUrl'));
      }, function (errRet) {
        $_alert(errRet.password);
      });
    }
  });
};