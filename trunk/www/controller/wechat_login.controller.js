'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _smsUtils = require('../lib/smsUtils');

var _smsUtils2 = _interopRequireDefault(_smsUtils);

var _cache = require('../lib/cache');

var _cache2 = _interopRequireDefault(_cache);

var _conf = require('../conf/conf');

var _conf2 = _interopRequireDefault(_conf);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRadomCode = function getRadomCode() {
	var _code = "";
	for (var iIndex = 0; iIndex < 6; iIndex++) {
		var code = parseInt(Math.random() * 10);
		_code += code;
	}
	return _code;
};
exports.default = {
	verifyPhone: regeneratorRuntime.mark(function verifyPhone(next) {
		var __selfBody, data;

		return regeneratorRuntime.wrap(function verifyPhone$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						__selfBody = this.request.body;

						this.checkBody('mobile').notEmpty('手机号不存在');

						if (!(this.errors && this.errors.length > 0)) {
							_context.next = 6;
							break;
						}

						_context.next = 5;
						return next;

					case 5:
						return _context.abrupt('return', _context.sent);

					case 6:
						_context.next = 8;
						return this.httpUtils.request('/user.do', 'get', {
							mobile: __selfBody.mobile
						});

					case 8:
						data = _context.sent;


						console.info(data);

						if (data.result == null || data.status != 0) {
							this.body = "false";
						} else {
							this.body = "true";
						}
						console.info(this.body);
						_context.next = 14;
						return next;

					case 14:
						return _context.abrupt('return', _context.sent);

					case 15:
					case 'end':
						return _context.stop();
				}
			}
		}, verifyPhone, this);
	}),
	captcha: regeneratorRuntime.mark(function captcha(next) {
		var __selfQuery, radomCode;

		return regeneratorRuntime.wrap(function captcha$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						__selfQuery = this.query;

						this.checkQuery('mobile').notEmpty('联系电话不存在');

						if (!(this.errors && this.errors.length > 0)) {
							_context2.next = 6;
							break;
						}

						_context2.next = 5;
						return next;

					case 5:
						return _context2.abrupt('return', _context2.sent);

					case 6:
						radomCode = getRadomCode();
						_context2.next = 9;
						return _smsUtils2.default.send(__selfQuery.mobile, radomCode);

					case 9:
						_context2.next = 11;
						return _cache2.default.addCache(_conf2.default.sys_cache_key, __selfQuery.mobile, radomCode);

					case 11:
						this.body = "success";
						_context2.next = 14;
						return next;

					case 14:
						return _context2.abrupt('return', _context2.sent);

					case 15:
					case 'end':
						return _context2.stop();
				}
			}
		}, captcha, this);
	}),
	saveWeChat: regeneratorRuntime.mark(function saveWeChat(next) {
		var __selfBody, __selfQuery, data, code, wechat_user_info, ret, __token;

		return regeneratorRuntime.wrap(function saveWeChat$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						__selfBody = this.request.body;
						__selfQuery = this.query;

						this.checkBody('mobile').notEmpty('手机号不存在');
						this.checkBody('password').notEmpty('密码不存在');

						if (!(this.errors && this.errors.length > 0)) {
							_context3.next = 8;
							break;
						}

						_context3.next = 7;
						return next;

					case 7:
						return _context3.abrupt('return', _context3.sent);

					case 8:
						_context3.next = 10;
						return this.httpUtils.request('/user.do', 'get', {
							mobile: __selfBody.mobile,
							password: __selfBody.password
						});

					case 10:
						data = _context3.sent;

						if (!(data.status != 0)) {
							_context3.next = 16;
							break;
						}

						this.throw("密码错误", 500);
						_context3.next = 15;
						return next;

					case 15:
						return _context3.abrupt('return', _context3.sent);

					case 16:
						code = __selfQuery.code;
						_context3.next = 19;
						return this.wechatOauth.getUserByCode(code);

					case 19:
						wechat_user_info = _context3.sent;
						_context3.next = 22;
						return this.httpUtils.request('/user.do', 'put', {
							id: data.result.id,
							gzptWechatId: wechat_user_info.openid,
							unionid: wechat_user_info.unionid
						});

					case 22:
						ret = _context3.sent;

						if (!(ret.status != 0)) {
							_context3.next = 28;
							break;
						}

						this.body = ret.message;
						_context3.next = 27;
						return next;

					case 27:
						return _context3.abrupt('return', _context3.sent);

					case 28:
						__token = _nodeUuid2.default.v4();
						_context3.next = 31;
						return _cache2.default.addCache(__token, 'session', ret.result);

					case 31:
						this.cookies.set('token', __token, {
							maxAge: 1000 * 60 * 60 * 24 * 30,
							HttpOnly: false
						});
						this.body = '账户绑定成功';
						_context3.next = 35;
						return next;

					case 35:
						return _context3.abrupt('return', _context3.sent);

					case 36:
					case 'end':
						return _context3.stop();
				}
			}
		}, saveWeChat, this);
	}),
	/* 微信授权登录 */
	loginByCode: regeneratorRuntime.mark(function loginByCode(next) {
		var __selfQuery, code, wechat_user_info, openid, data, __token;

		return regeneratorRuntime.wrap(function loginByCode$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						__selfQuery = void 0, code = void 0, wechat_user_info = void 0, openid = void 0;


						__selfQuery = this.query;
						code = __selfQuery.code;
						_context4.next = 5;
						return this.wechatOauth.getUserByCode(code);

					case 5:
						wechat_user_info = _context4.sent;
						_context4.next = 8;
						return this.httpUtils.request('/user.do', 'get', {
							gzptWechatId: wechat_user_info.openid
						});

					case 8:
						data = _context4.sent;

						if (!(data.result == null)) {
							_context4.next = 14;
							break;
						}

						this.throw('尚未注册', 500);
						_context4.next = 13;
						return next;

					case 13:
						return _context4.abrupt('return', _context4.sent);

					case 14:
						if (!(data.result != null || data.status != 0)) {
							_context4.next = 18;
							break;
						}

						_context4.next = 17;
						return this.httpUtils.request('/user.do', 'get', {
							unionid: wechat_user_info.unionid
						});

					case 17:
						data = _context4.sent;

					case 18:
						__token = _nodeUuid2.default.v4();
						_context4.next = 21;
						return _cache2.default.addCache(__token, 'session', data.result);

					case 21:
						this.cookies.set('token', __token, {
							maxAge: 1000 * 60 * 60 * 24 * 30,
							HttpOnly: false
						});
						if (data.status == 0) {
							this.body = "登录成功";
						}

					case 23:
					case 'end':
						return _context4.stop();
				}
			}
		}, loginByCode, this);
	})
};