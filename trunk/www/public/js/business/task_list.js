'use strict';

window.$_ready = function () {
  var template_selector = "#tempalte",
      target_selector = "#task_list_container",
      data_url = "/execution/paging",
      tesk_item_selector = ".task_item";

  var next_page = 1;

  var load_next_page = function load_next_page() {
    $_http(data_url, 'get', "json", {
      page: next_page
    }, function (server_data) {
      if (server_data.pagenumber < next_page) {
        $('#next_page').unbind('click');
        return;
      }
      $_template(template_selector, target_selector, server_data.rows).then(function () {
        $(tesk_item_selector).on('click', function (e) {
          var id = $(e.currentTarget).attr("id");
          window.location.href = $_server + "/task_details.html?id=" + id;
        });
      });
    });
  };

  $('#next_page').bind('click', function () {
    next_page++;
    load_next_page();
  });

  load_next_page();
};