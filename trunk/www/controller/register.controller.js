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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	register: regeneratorRuntime.mark(function register(next) {
		var __selfBody, __selfQuery, code, wechat_user_info, radomCode, params, parentId, ret;

		return regeneratorRuntime.wrap(function register$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						__selfBody = this.request.body;
						__selfQuery = this.query;

						this.checkBody('phone').notEmpty('账号不存在');
						this.checkBody('password').notEmpty('密码不存在');
						this.checkBody('rpassword').notEmpty('密码不存在');
						this.checkBody('captcha').notEmpty('验证码不存在');

						if (!(this.errors && this.errors.length > 0)) {
							_context.next = 10;
							break;
						}

						_context.next = 9;
						return next;

					case 9:
						return _context.abrupt('return', _context.sent);

					case 10:
						code = __selfQuery.code;
						_context.next = 13;
						return this.wechatOauth.getUserByCode(code);

					case 13:
						wechat_user_info = _context.sent;
						_context.next = 16;
						return _cache2.default.getCache(_conf2.default.sys_cache_key, __selfBody.phone);

					case 16:
						radomCode = _context.sent;

						if (!(__selfBody.captcha !== radomCode)) {
							_context.next = 22;
							break;
						}

						this.throw("验证码不正确", 500);
						_context.next = 21;
						return next;

					case 21:
						return _context.abrupt('return', _context.sent);

					case 22:
						params = {
							loginName: __selfBody.phone,
							password: __selfBody.rpassword,
							mobile: __selfBody.phone,
							gzptWechatId: wechat_user_info.openid,
							unionid: wechat_user_info.unionid
						};
						parentId = __selfQuery.parentId;

						if (parentId) {
							params['parent.id'] = parentId;
						}
						_context.next = 27;
						return this.httpUtils.request('/user.do', 'post', params);

					case 27:
						ret = _context.sent;

						if (ret.status == 0) {
							this.body = "注册并绑定成功";
						} else {
							this.checkBody('msg').addError();
						}
						_context.next = 31;
						return _cache2.default.removeCache(_conf2.default.sys_cache_key, __selfBody.phone);

					case 31:
						_context.next = 33;
						return next;

					case 33:
						return _context.abrupt('return', _context.sent);

					case 34:
					case 'end':
						return _context.stop();
				}
			}
		}, register, this);
	})
};