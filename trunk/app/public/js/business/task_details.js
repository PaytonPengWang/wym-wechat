'use strict';

window.$_ready = () => {
  var id = WebUtils.getUrlParam('id');

  $_template('#template','#template_details','/execution/findById/'+id).then(function(){
    $('#go_app').on('click',() => {
      window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.n297303831.gka';
    })
  });
}
