window.$_ready = () => {
  let $ok = $('#ok');

  $ok.on('click',() => {
    $_bind_or_register_success();
  })
}
