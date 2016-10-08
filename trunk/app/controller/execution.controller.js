import babelPolyfill from 'babel-polyfill';
import PagerFormatUtils from '../lib/PagerFormatUtils';

export default{
	/*任务列表*/
	paging :function*(next){
		let __selfQuery = this.query;
		this.checkQuery('page').default("1").toInt();
        this.checkQuery('rows').default("10").toInt();
        let params = {
			paging : true,
        	pageNum : __selfQuery.page,
        	pageSize : 10
        };
        let result;
        var data  = yield this.httpUtils.request('/advertisement/exec.do','get',params);
        if(null!==data.result){
        	result=data.result = PagerFormatUtils(data.result);
        }else{
        	result = data;
        }
		this.body=data.result;
        return yield next;
	},
	/*我的任务列表*/
	selfPaging : function*(next){
		let __selfQuery = this.query;
		this.checkQuery('page').default("1").toInt();
        this.checkQuery('rows').default("10").toInt();
        
        var data  = yield this.httpUtils.request('/user/advertisement.do','get',{
        	paging : true,
        	pageNum : __selfQuery.page,
        	pageSize : 10,
        	"user.id":'8a0194be540da523015429c04fca0073',
        	status:status
        });
        let result;
        if(null!==data.result){
        	result=data.result = PagerFormatUtils(data.result);
        }else{
        	result = data;
        }
		this.body=data.result;
        return yield next;
	},
	/*任务详情*/
	findById:function*(next){
		var __selfParams = this.params;
		this.checkParams('id').notEmpty('任务Id不存在').isLength(32,32,'任务Id不存在');
		if(this.errors && this.errors.length>0){
			return yield next;
		}
		let params = {
			id : __selfParams.id
		};
		
		var data =yield this.httpUtils.request('/advertisement/'+__selfParams.id+'.do','get',{
			id:__selfParams.id
		});
		if(data.status==0){
			this.body = data.result;
		}
		return yield next;
	},
	/*我的任务详情*/
	findByIdUid:function*(next){
		var __selfParams = this.params;
		this.checkParams('id').notEmpty('任务Id不存在').isLength(32,32,'任务Id不存在');
		if(this.errors && this.errors.length>0){
			return yield next;
		}
		let params = {
			id : __selfParams.id
		};
		
		let data = yield this.httpUtils.request('/user/advertisement.do','get',{
			advId : __selfParams.id,
			userId:'8a0194be540da523015429c04fca0073'
		});

		if(data.status==0){
			let logsData = yield this.httpUtils.request('/user/advertisement/log.do','get',{
			user_adv_id:data.result.id
		});
			data.result.logs = logsData.result;
			this.body = data.result;
		}
		return yield next;
	},
	/*执行任务*/
	acceptById:function*(next){
		let _data = null;
		let fxModel = '';
		let __selfParams = this.params;
		console.info(__selfParams.id);
		this.checkParams('id').notEmpty('任务Id不存在').isLength(32,32,'任务Id不存在');
		if(this.errors && this.errors.length>0){
			return yield next;
		}
		let userId = '8a0194be540da523015429c04fca0073';
		let data = yield this.httpUtils.request('/user/advertisement.do','get',{
			user_id:userId,
			adv_id:__selfParams.id
		});
		if(data.status!=0){
			/*尚未接受任务*/
			let newData = yield this.httpUtils.request('/user/advertisement/'+userId+'/'+__selfParams.id+'.do?status=start','post',{
				"user.id":userId,
				"advertisement.id":__selfParams.id
			});
			if(result.status != 0){
                this.throw(result.message);
                return yield next;
            }
            _data=newData.result;
		}else{
			_data = data.result;
		}
		if(_data.fxModel&&"link"===_data.fxModel){
			this.body="link";
		}else{
			this.body="app";
		}
		return yield next;
	},
	/*我的收益*/
	selfInCome: function*(next){
		let datas = {};
		let userId = '';
		/*if(this.session && this.session.id){
			userId = '8a0194be540da523015429c04fca0073';
		}else{
			this.throw("用户尚未登录",500);
		}*/
		userId = "8a0194be540da523015429c04fca0073";
		let data = yield this.httpUtils.request('/user/consume/log/count.do','get',{
			"user.id":userId
		});
		let consumesCount = data.result;/*总收益*/

		let advCount = yield this.httpUtils.request('/user/consume/log.do','get',{
			"userId":userId
		});
		console.info(data);
		let advs = advCount.result[0];/*做任务数*/
		let advmoney = advCount.result[1];/*任务收益*/

		let childsData = yield this.httpUtils.request('/user.do','get',{
			parentId:userId
		});
		let childs = childsData.result;/*粉丝数*/
		let childMoney = childs*2;/*邀请粉丝收益*/

		let fansData = yield this.httpUtils.request('/user/consume/log/fans.do','get',{
			"user.id":userId
		});
		let fans = childsData.result;/*粉丝数，同childs*/
		let fansMoney = fansData.result;/*粉丝做任务贡献收益*/

		let advsP = advmoney/consumesCount;/*任务收益占比*/
		let childsP = childMoney/consumesCount;/*邀请粉丝收益占比*/
		let fansP = fansMoney/consumesCount;/*粉丝贡献收益占比*/
		this.body = {
			consumesCount :consumesCount/100,
			advs:advs,
			advmoney:advmoney/100,
			childs:childs,
			childMoney:childMoney/100,
			fans:fans,
			fansMoney:fansMoney,
			advsP:advsP,
			childsP:childsP,
			fansP:fansP
		}
		return yield next;
	}
}
