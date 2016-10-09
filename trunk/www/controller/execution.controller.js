'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _PagerFormatUtils = require('../lib/PagerFormatUtils');

var _PagerFormatUtils2 = _interopRequireDefault(_PagerFormatUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	/*任务列表*/
	paging: regeneratorRuntime.mark(function paging(next) {
		var __selfQuery, params, result, data;

		return regeneratorRuntime.wrap(function paging$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						__selfQuery = this.query;

						this.checkQuery('page').default("1").toInt();
						this.checkQuery('rows').default("10").toInt();
						params = {
							paging: true,
							pageNum: __selfQuery.page,
							pageSize: 10
						};
						result = void 0;
						_context.next = 7;
						return this.httpUtils.request('/advertisement/exec.do', 'get', params);

					case 7:
						data = _context.sent;

						if (null !== data.result) {
							result = data.result = (0, _PagerFormatUtils2.default)(data.result);
						} else {
							result = data;
						}
						this.body = data.result;
						_context.next = 12;
						return next;

					case 12:
						return _context.abrupt('return', _context.sent);

					case 13:
					case 'end':
						return _context.stop();
				}
			}
		}, paging, this);
	}),
	/*我的任务列表*/
	selfPaging: regeneratorRuntime.mark(function selfPaging(next) {
		var __selfQuery, data, result;

		return regeneratorRuntime.wrap(function selfPaging$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						__selfQuery = this.query;

						this.checkQuery('page').default("1").toInt();
						this.checkQuery('rows').default("10").toInt();
						this.checkQuery('status').default('');

						_context2.next = 6;
						return this.httpUtils.request('/user/advertisement.do', 'get', {
							paging: true,
							pageNum: __selfQuery.page,
							pageSize: 10,
							"user.id": '8a0194be540da523015429c04fca0073',
							status: __selfQuery.status
						});

					case 6:
						data = _context2.sent;
						result = void 0;

						if (null !== data.result) {
							result = data.result = (0, _PagerFormatUtils2.default)(data.result);
						} else {
							result = data;
						}
						this.body = data.result;
						_context2.next = 12;
						return next;

					case 12:
						return _context2.abrupt('return', _context2.sent);

					case 13:
					case 'end':
						return _context2.stop();
				}
			}
		}, selfPaging, this);
	}),
	/*任务详情*/
	findById: regeneratorRuntime.mark(function findById(next) {
		var __selfParams, params, data;

		return regeneratorRuntime.wrap(function findById$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						__selfParams = this.params;

						this.checkParams('id').notEmpty('任务Id不存在').isLength(32, 32, '任务Id不存在');

						if (!(this.errors && this.errors.length > 0)) {
							_context3.next = 6;
							break;
						}

						_context3.next = 5;
						return next;

					case 5:
						return _context3.abrupt('return', _context3.sent);

					case 6:
						params = {
							id: __selfParams.id
						};
						_context3.next = 9;
						return this.httpUtils.request('/advertisement/' + __selfParams.id + '.do', 'get', {
							id: __selfParams.id
						});

					case 9:
						data = _context3.sent;

						if (data.status == 0) {
							this.body = data.result;
						}
						_context3.next = 13;
						return next;

					case 13:
						return _context3.abrupt('return', _context3.sent);

					case 14:
					case 'end':
						return _context3.stop();
				}
			}
		}, findById, this);
	}),
	/*我的任务详情*/
	findByIdUid: regeneratorRuntime.mark(function findByIdUid(next) {
		var __selfParams, params, data, logsData;

		return regeneratorRuntime.wrap(function findByIdUid$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						__selfParams = this.params;

						this.checkParams('id').notEmpty('任务Id不存在').isLength(32, 32, '任务Id不存在');

						if (!(this.errors && this.errors.length > 0)) {
							_context4.next = 6;
							break;
						}

						_context4.next = 5;
						return next;

					case 5:
						return _context4.abrupt('return', _context4.sent);

					case 6:
						params = {
							id: __selfParams.id
						};
						_context4.next = 9;
						return this.httpUtils.request('/user/advertisement.do', 'get', {
							advId: __selfParams.id,
							userId: '8a0194be540da523015429c04fca0073'
						});

					case 9:
						data = _context4.sent;

						if (!(data.status == 0)) {
							_context4.next = 16;
							break;
						}

						_context4.next = 13;
						return this.httpUtils.request('/user/advertisement/log.do', 'get', {
							user_adv_id: data.result.id
						});

					case 13:
						logsData = _context4.sent;

						data.result.logs = logsData.result;
						this.body = data.result;

					case 16:
						_context4.next = 18;
						return next;

					case 18:
						return _context4.abrupt('return', _context4.sent);

					case 19:
					case 'end':
						return _context4.stop();
				}
			}
		}, findByIdUid, this);
	}),
	/*执行任务*/
	acceptById: regeneratorRuntime.mark(function acceptById(next) {
		var _data, fxModel, __selfParams, userId, data, newData;

		return regeneratorRuntime.wrap(function acceptById$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_data = null;
						fxModel = '';
						__selfParams = this.params;

						console.info(__selfParams.id);
						this.checkParams('id').notEmpty('任务Id不存在').isLength(32, 32, '任务Id不存在');

						if (!(this.errors && this.errors.length > 0)) {
							_context5.next = 9;
							break;
						}

						_context5.next = 8;
						return next;

					case 8:
						return _context5.abrupt('return', _context5.sent);

					case 9:
						userId = '8a0194be540da523015429c04fca0073';
						_context5.next = 12;
						return this.httpUtils.request('/user/advertisement.do', 'get', {
							user_id: userId,
							adv_id: __selfParams.id
						});

					case 12:
						data = _context5.sent;

						if (!(data.status != 0)) {
							_context5.next = 25;
							break;
						}

						_context5.next = 16;
						return this.httpUtils.request('/user/advertisement/' + userId + '/' + __selfParams.id + '.do?status=start', 'post', {
							"user.id": userId,
							"advertisement.id": __selfParams.id
						});

					case 16:
						newData = _context5.sent;

						if (!(result.status != 0)) {
							_context5.next = 22;
							break;
						}

						this.throw(result.message);
						_context5.next = 21;
						return next;

					case 21:
						return _context5.abrupt('return', _context5.sent);

					case 22:
						_data = newData.result;
						_context5.next = 26;
						break;

					case 25:
						_data = data.result;

					case 26:
						if (_data.fxModel && "link" === _data.fxModel) {
							this.body = "link";
						} else {
							this.body = "app";
						}
						_context5.next = 29;
						return next;

					case 29:
						return _context5.abrupt('return', _context5.sent);

					case 30:
					case 'end':
						return _context5.stop();
				}
			}
		}, acceptById, this);
	}),
	/*我的收益*/
	selfInCome: regeneratorRuntime.mark(function selfInCome(next) {
		var datas, userId, data, consumesCount, advCount, advs, advmoney, childsData, childs, childMoney, fansData, fans, fansMoney, advsP, childsP, fansP;
		return regeneratorRuntime.wrap(function selfInCome$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						datas = {};
						userId = '';
						/*if(this.session && this.session.id){
      	userId = '8a0194be540da523015429c04fca0073';
      }else{
      	this.throw("用户尚未登录",500);
      }*/

						userId = "8a0194be540da523015429c04fca0073";
						_context6.next = 5;
						return this.httpUtils.request('/user/consume/log/count.do', 'get', {
							"user.id": userId
						});

					case 5:
						data = _context6.sent;
						consumesCount = data.result; /*总收益*/

						_context6.next = 9;
						return this.httpUtils.request('/user/consume/log.do', 'get', {
							"userId": userId
						});

					case 9:
						advCount = _context6.sent;

						console.info(data);
						advs = advCount.result[0]; /*做任务数*/

						advmoney = advCount.result[1]; /*任务收益*/

						_context6.next = 15;
						return this.httpUtils.request('/user.do', 'get', {
							parentId: userId
						});

					case 15:
						childsData = _context6.sent;
						childs = childsData.result; /*粉丝数*/

						childMoney = childs * 2; /*邀请粉丝收益*/

						_context6.next = 20;
						return this.httpUtils.request('/user/consume/log/fans.do', 'get', {
							"user.id": userId
						});

					case 20:
						fansData = _context6.sent;
						fans = childsData.result; /*粉丝数，同childs*/

						fansMoney = fansData.result; /*粉丝做任务贡献收益*/

						advsP = advmoney / consumesCount; /*任务收益占比*/

						childsP = childMoney / consumesCount; /*邀请粉丝收益占比*/

						fansP = fansMoney / consumesCount; /*粉丝贡献收益占比*/

						this.body = {
							consumesCount: consumesCount / 100,
							advs: advs,
							advmoney: advmoney / 100,
							childs: childs,
							childMoney: childMoney / 100,
							fans: fans,
							fansMoney: fansMoney,
							advsP: advsP,
							childsP: childsP,
							fansP: fansP
						};
						_context6.next = 29;
						return next;

					case 29:
						return _context6.abrupt('return', _context6.sent);

					case 30:
					case 'end':
						return _context6.stop();
				}
			}
		}, selfInCome, this);
	})
};