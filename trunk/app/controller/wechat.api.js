import babelPolyfill from 'babel-polyfill';

export default {
	config :function*(next){
		let __selfQuery = this.query;

		let url,jsApiList;

		url = __selfQuery.url;
		jsApiList = __selfQuery.jsApiList.split(',');

		let jsApiConfig = yield this.wechatAPI.getJsConfig({
			 debug: false,
			 jsApiList: jsApiList,
			 url: url
		});

		this.body = jsApiConfig;

		return yield next;
	},
	oath2Url : function*(next){

		let appid,url,state,scope,__selfQuery,wechatOathUrl;

		__selfQuery = this.query;
		appid 			= this.config.wechat.appid;
		url 				= __selfQuery.url;
		state				= __selfQuery.state || 'default';
		scope				= __selfQuery.scope || 'snsapi_userinfo';

		wechatOathUrl = this.wechatOauth.getAuthorizeURL(url,state,scope);
		console.info(wechatOathUrl);
		this.body = wechatOathUrl;

		return yield next;
	}
}
