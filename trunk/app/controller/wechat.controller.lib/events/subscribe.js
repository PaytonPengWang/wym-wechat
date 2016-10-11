export default function*(){
	let wx_msg = this.weixin;
	
	let wx_user = yield this.wechatAPI.getUser(wx_msg.FromUserName);
	let data = yield this.httpUtils.request('/user.do','get',{
		unionid:unionid
	});

	if(data.status!=0){
		this.body = {
			content : wx_user.nickname + '，欢迎您加入微云媒，当前尚未绑定微云媒账户，请立即绑定或注册，开启微云媒赚零花钱之旅。'
		}
	}else{
		let ret = yield this.httpUtils.request('/user.do','put',{
			id:data.result.id,
			gzptWechatId:wx_msg.FromUserName
		});
		if(ret.status!=0){
			/*this.throw(ret.message,500);*/
		}else{
			this.body = {
				content: wx_user.nickname+'，欢迎您加入微云媒',
		      	type: 'text'
			}
		}
	}
}
