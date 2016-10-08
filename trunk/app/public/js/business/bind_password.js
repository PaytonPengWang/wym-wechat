window.$_ready = () => {
  let $password  = $('#password'),
      $bind = $('#bind');


  $bind.on('click',() => {
    let strPassword = $password.val();
    if(strPassword==null || strPassword == ''){
      $_alert('请输入登录密码',() => {
        $password.focus();
      });
    }else{
      strPassword = md5(strPassword);
      $_http('/wechat_login/save?code='+WebUtils.getUrlParam('code'),'put','text',{
        mobile : WebUtils.getUrlParam('mobile'),
        password : strPassword,
      },(ret) => {
        window.location.href = $_server+"/bind_success.html?state=bind_phone&redirectUrl="+window.encodeURIComponent(WebUtils.getUrlParam('redirectUrl'));
      },(errRet) => {
        $_alert(errRet.password);
      })
    }
  });
};
