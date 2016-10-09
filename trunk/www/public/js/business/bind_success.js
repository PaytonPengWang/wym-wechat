'use strict';

window.$_ready = function () {
  var $ok = $('#ok');

  $ok.on('click', function () {
    $_bind_or_register_success();
  });
};