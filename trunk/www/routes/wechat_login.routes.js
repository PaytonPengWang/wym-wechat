'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _wechat_login = require('../controller/wechat_login.controller');

var _wechat_login2 = _interopRequireDefault(_wechat_login);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaRouter2.default)();

router.put('/wechat_login', _wechat_login2.default.verifyPhone);

router.get('/wechat_login/captcha', _wechat_login2.default.captcha);
router.put('/wechat_login/save', _wechat_login2.default.saveWeChat);
router.get('/wechat_login/code', _wechat_login2.default.loginByCode);
exports.default = router.routes();