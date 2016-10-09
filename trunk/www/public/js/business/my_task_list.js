'use strict';

window.$_ready = function () {
  /* getStatus */
  var status = !!WebUtils.getUrlParam("status") ? WebUtils.getUrlParam("status") : 'all';

  /* set status of title */
  var setStatus = function setStatus() {
    $('#status_' + status).addClass('active');
  };
  setStatus();

  var next_page_btn = $('#next_page'),
      my_task_list_selector = "#my_task_list",
      template_selector = "#template",
      tesk_item_selector = ".task_item",
      data_url = "/execution/selfPaging";
  var next_page = 1;

  var load_next_page = function load_next_page() {
    $_http(data_url, 'get', "json", {
      page: next_page,
      status: status == "all" ? "" : status
    }, function (server_data) {
      if (server_data.pagenumber < next_page) {
        $('#next_page').unbind('click');
        return;
      }
      $_template(template_selector, my_task_list_selector, server_data.rows).then(function () {
        $(tesk_item_selector).on('click', function (e) {
          var id = $(e.currentTarget).attr("id");
          window.location.href = $_server + "/my_task_details.html?id=" + id;
        });
      });
    });
  };

  load_next_page();

  $('#next_page').bind("click", function () {
    next_page++;
    load_next_page();
  });
};