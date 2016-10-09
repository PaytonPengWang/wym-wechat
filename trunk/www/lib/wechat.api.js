'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _coWechatApi = require('co-wechat-api');

var _coWechatApi2 = _interopRequireDefault(_coWechatApi);

var _conf = require('../conf/conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var api = new _coWechatApi2.default(_conf2.default.wechat.appid, _conf2.default.wechat.appsecret);

exports.default = api;