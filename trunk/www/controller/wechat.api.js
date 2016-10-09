'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	config: regeneratorRuntime.mark(function config(next) {
		var __selfQuery, url, jsApiList, jsApiConfig;

		return regeneratorRuntime.wrap(function config$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						__selfQuery = this.query;
						url = void 0, jsApiList = void 0;


						url = __selfQuery.url;
						jsApiList = __selfQuery.jsApiList.split(',');

						_context.next = 6;
						return this.wechatAPI.getJsConfig({
							debug: false,
							jsApiList: jsApiList,
							url: url
						});

					case 6:
						jsApiConfig = _context.sent;


						this.body = jsApiConfig;

						_context.next = 10;
						return next;

					case 10:
						return _context.abrupt('return', _context.sent);

					case 11:
					case 'end':
						return _context.stop();
				}
			}
		}, config, this);
	}),
	oath2Url: regeneratorRuntime.mark(function oath2Url(next) {
		var appid, url, state, scope, __selfQuery, wechatOathUrl;

		return regeneratorRuntime.wrap(function oath2Url$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						appid = void 0, url = void 0, state = void 0, scope = void 0, __selfQuery = void 0, wechatOathUrl = void 0;


						__selfQuery = this.query;
						appid = this.config.wechat.appid;
						url = __selfQuery.url;
						state = __selfQuery.state || 'default';
						scope = __selfQuery.scope || 'snsapi_userinfo';

						wechatOathUrl = this.wechatOauth.getAuthorizeURL(url, state, scope);
						console.info(wechatOathUrl);
						this.body = wechatOathUrl;

						_context2.next = 11;
						return next;

					case 11:
						return _context2.abrupt('return', _context2.sent);

					case 12:
					case 'end':
						return _context2.stop();
				}
			}
		}, oath2Url, this);
	})
};