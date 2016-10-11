'use strict';

window.$_ready = () =>{
	var template_selector = '#my_income_template',
		content_selector = '#my_income_content';


	$_http('/execution/selfInCome','get',"json",{
    },(server_data)=>{
      $_template(template_selector,content_selector,server_data).then(() => {
        $('#charts').highcharts({
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            type: 'pie'
	        },
	        title: {
	            text: '您累计获取奖励'
	        },
	        series: [{
	            name: '占比',
	            colorByPoint: true,
	            data: [{
	                name: '任务收益：'+Math.round(server_data.advsP * 100)+'%',
	                y: Math.round(server_data.advsP * 100)
	            }, {
	                name: '邀请奖金：'+Math.round(server_data.childsP * 100)+'%',
	                y: Math.round(server_data.childsP * 100)
	            }, {
	                name: '粉丝贡献：'+Math.round(server_data.fansP * 100)+'%',
	                y: Math.round(server_data.fansP * 100)
	            }]
	        }]
	    });
	    setTimeout(function(){
	    	$('#charts').height(350);
	    	$('#charts svg').attr('height',350);
	    	$('text.highcharts-title').remove();
	    	$('#charts').css('margin-top','-75px')
	    },1);
      });
    })
}