'use strict';

window.$_ready = function () {
  var mobile = void 0,
      code = void 0,
      redirectUrl = void 0,
      $ValidateCode = $('#validate_code'),
      $Password = $('#password'),
      $Password2 = $('#password2'),
      $Submit = $('#submit'),
      validateCode = void 0,
      password = void 0,
      password2 = void 0;

  mobile = WebUtils.getUrlParam('mobile');
  code = WebUtils.getUrlParam('code');
  redirectUrl = WebUtils.getUrlParam('redirectUrl');

  window.getValidateCode = function () {
    $_http('/wechat_login/captcha', 'get', 'text', {
      mobile: mobile
    }, function (ret) {
      /* 验证码获取成功 */
    });
  };

  getValidateCode();

  $Submit.on('click', function () {
    validateCode = $ValidateCode.val();
    password = $Password.val();
    password2 = $Password2.val();

    if (validateCode == null || validateCode == '') {
      $_alert('请填写验证码');
      return;
    }

    if (password == null || password == '') {
      $_alert('请填写密码');
      return;
    }

    if (password !== password2) {
      $_alert('两次密码输入必须一致');
      return;
    }

    password = md5(password);
    password2 = md5(password2);

    $_http('/register?code=' + code, 'post', 'text', {
      phone: mobile,
      password: password,
      rpassword: password2,
      captcha: validateCode
    }, function (ret) {
      window.location.href = $_server + "/bind_success.html?state=bind_phone&redirectUrl=" + window.encodeURIComponent(redirectUrl);
    }, function (errRet) {
      if (errRet.captcha) {
        $_alert(errRet.captcha);
      } else if (errRet.password) {
        $_alert(errRet.password);
      } else if (errRet.password2) {
        $_alert(errRet.password2);
      }
    });
  });
};