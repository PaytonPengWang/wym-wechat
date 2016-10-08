import babelPolyfill from 'babel-polyfill';
import smsUtils from '../lib/smsUtils';
import cacheUtils from '../lib/cache';
import conf from '../conf/conf';



export default {
	register : function*(next){
		let __selfBody = this.request.body;
		let __selfQuery = this.query;
		this.checkBody('phone').notEmpty('账号不存在');
		this.checkBody('password').notEmpty('密码不存在');
		this.checkBody('rpassword').notEmpty('密码不存在');
		this.checkBody('captcha').notEmpty('验证码不存在');
		if(this.errors && this.errors.length>0){
			return yield next;
		}

		let code 		 		= __selfQuery.code;
		let wechat_user_info				= yield this.wechatOauth.getUserByCode(code);
		let radomCode = yield cacheUtils.getCache(conf.sys_cache_key,__selfBody.phone);
		if(__selfBody.captcha!==radomCode){
			 this.throw("验证码不正确",500);
			return yield next;
		}
		let params = {
			loginName:__selfBody.phone,
			password :__selfBody.rpassword,
			mobile : __selfBody.phone,
			gzptWechatId:wechat_user_info.openid,
			unionid:wechat_user_info.unionid
		};
		let parentId = __selfQuery.parentId;
		if(parentId){
			params['parent.id']=parentId;
		}
		let ret = yield this.httpUtils.request('/user.do','post',params);
		if(ret.status==0){
			this.body = "注册并绑定成功";
		}else{
			this.checkBody('msg').addError();
		}
		yield cacheUtils.removeCache(conf.sys_cache_key,__selfBody.phone);
		return yield next;
	}
}
