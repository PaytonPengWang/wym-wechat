export default function*(next){
	let wx_msg = this.weixin;
	/*var $access_token = "5ic8RoqZd7IBUtE0aGXUhcdKBnrwlO1iqtvyJJUgIcDcopJIH7x90QH4yiK_z08fqp4WOD7kfKPDtET29BRYNZO-sSIITaxIj4u72LYAYcFH6t1fiSVzjUuqYWOtHiw0LGDorxx5Qj6SN0Z7GtYGTA";

	var $openid=wx_msg.FromUserName;
	var $url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=$access_token&openid=$openid&lang=zh_CN";
	var $output = https.https_request($url);
	var_dump($output);*/
	var unionid = "o-Q9Xv2eDs7MhHOBSZr0quC1D8vE";
	let data = yield this.httpUtils.request('/user.do','get',{
		unionid:unionid
	});
	if(data.status!=0){
		this.throw("该微信用户不存在",500);
	}else{
		let ret = yield this.httpUtils.request('/user/ '+data.result.id+'.do','put',{
			id:data.result.id,
			gzptWechatId:""
		});
		if(ret.status!=0){
			this.throw(ret.message,500);
		}else{
			this.body="success";
		}
	}

}
