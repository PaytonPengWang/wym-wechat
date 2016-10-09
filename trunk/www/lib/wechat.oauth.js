'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _coWechatOauth = require('co-wechat-oauth');

var _coWechatOauth2 = _interopRequireDefault(_coWechatOauth);

var _conf = require('../conf/conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var client = new _coWechatOauth2.default(_conf2.default.wechat.appid, _conf2.default.wechat.appsecret);

exports.default = client;