import babelPolyfill    from 'babel-polyfill';
import smsUtils from '../lib/smsUtils';
import cacheUtils from '../lib/cache';
import conf from '../conf/conf';
import uuid from 'node-uuid';


let getRadomCode = function(){
	var _code = "";
    for(var iIndex=0;iIndex<6;iIndex++) {
        var code = parseInt(Math.random() * 10);
        _code+=code;
    }
    return _code;
}
export default{
	verifyPhone :function*(next){
		let __selfBody = this.request.body;
		this.checkBody('mobile').notEmpty('手机号不存在');
		if(this.errors&&this.errors.length>0){
			return yield next;
		}
		let data = yield this.httpUtils.request('/user.do','get',{
			mobile:__selfBody.mobile
		});

		console.info(data);

		if(data.result == null || data.status!=0){
			this.body = "false";
		}else{
			this.body="true";
		}
		console.info(this.body);
		return yield next;
	},
	captcha: function*(next){
		let __selfQuery = this.query;
		this.checkQuery('mobile').notEmpty('联系电话不存在');
		if(this.errors && this.errors.length>0){
			return yield next;
		}
		let radomCode = getRadomCode();

		yield smsUtils.send(__selfQuery.mobile,radomCode);
		yield cacheUtils.addCache(conf.sys_cache_key,__selfQuery.mobile,radomCode);
		this.body="success";
		return yield next;
	} ,
	saveWeChat:function*(next){
		let __selfBody = this.request.body;
		let __selfQuery= this.query;
		this.checkBody('mobile').notEmpty('手机号不存在');
		this.checkBody('password').notEmpty('密码不存在');
		if(this.errors&&this.errors.length>0){
			return yield next;
		}
		let data  =yield this.httpUtils.request('/user.do','get',{
			mobile : __selfBody.mobile,
			password:__selfBody.password
		});
		if(data.status!=0){
			this.throw("密码错误",500);
		 	return yield next;
		}

		let code 		 		= __selfQuery.code;
		let wechat_user_info				= yield this.wechatOauth.getUserByCode(code);
		let ret = yield this.httpUtils.request('/user.do','put',{
			id:data.result.id,
			gzptWechatId:wechat_user_info.openid,
			unionid:wechat_user_info.unionid
		});
		if(ret.status!=0){
			this.body = ret.message;
	   	 return yield next;
		}

		let __token = uuid.v4();

		yield cacheUtils.addCache(__token,'session',ret.result);
	    this.cookies.set('token',__token,{
	      maxAge : 1000*60*60*24*30,
	      HttpOnly : false
	    });
	    this.body = '账户绑定成功';
		return yield next;
	},
	/* 微信授权登录 */
	loginByCode : function*(next){
		let __selfQuery,code,wechat_user_info,openid;

		__selfQuery	 		= this.query;
		code 		 		= __selfQuery.code;
		wechat_user_info				= yield this.wechatOauth.getUserByCode(code);

		/* 根据openid登录，如果无法查询到信息，则获取用户详细信息，通过unionid获取 */
		let data = yield this.httpUtils.request('/user.do','get',{
			gzptWechatId:wechat_user_info.openid
		});
		if(data.result==null ){
			this.throw('尚未注册',500);
			return yield next;
		}
		if(data.result!=null || data.status!=0){
			data = yield this.httpUtils.request('/user.do','get',{
				unionid:wechat_user_info.unionid
			});
		}

		let __token = uuid.v4();
		yield cacheUtils.addCache(__token,'session',data.result);
	    this.cookies.set('token',__token,{
	      maxAge : 1000*60*60*24*30,
	      HttpOnly : false
	    });
		if(data.status==0){
			this.body = "登录成功";
		}
	}
}
