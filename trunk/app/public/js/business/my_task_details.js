'use strict';

window.$_ready = () => {

	var myTaskId = WebUtils.getUrlParam('id'),
		template_selector = '#my_task_detail_tempalte',
		tesk_item_selector = ".task_item",
		my_task_details_selector = '#my_task_detail';

	$_http('/execution/findByIdUid/'+myTaskId,"get","json",{},(server_data) => {
		$_template(template_selector,my_task_details_selector,server_data).then(()=>{
			$().timelinr({
				orientation: 'vertical'
			});
			setTimeout(function(){
				$('#dates').css('margin-top','0px')
				$('#issues').css('width',$(window).width()-$('#dates').width());
				$('#issues li').css('width',$(window).width()-$('#dates').width());
			},1);
			$(tesk_item_selector).on('click',(e)=>{
	          var id = $(e.currentTarget).attr("id");
	          window.location.href = $_server+"/task_details.html?id="+id;
	        });
		})
	})
}

