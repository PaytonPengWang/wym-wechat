window.$_ready = () => {
  let $next  = $('#next'),
      $phone = $('#phone'),
      code;


  if(WebUtils.getUrlParam("state")!=='bind_phone'){
    $_login('bind_phone');
    return;
  }else{
    code = WebUtils.getUrlParam('code');
  }

  $next.on('click',() => {
    let strPhone = $phone.val();
    if(strPhone==null || strPhone == ''){
      $_alert('请输入手机号',() => {
        $phone.focus();
      });
    }else{
      $_http('/wechat_login','put','text',{
        mobile : strPhone
      },(ret) => {
        if(ret=="true"){ /* 已经注册 */
          window.location.href = $_server+"/bind_password.html?state=bind_phone&mobile="+strPhone+"&code="+code+"&redirectUrl="+window.encodeURIComponent(WebUtils.getUrlParam('redirectUrl'));
        }else{  /* 尚未注册 */
          window.location.href = $_server+"/register_password.html?state=bind_phone&mobile="+strPhone+"&code="+code+"&redirectUrl="+window.encodeURIComponent(WebUtils.getUrlParam('redirectUrl'));
        }
      },(errRet) => {
        $_alert(errRet.mobile);
      })
    }
  });
};
