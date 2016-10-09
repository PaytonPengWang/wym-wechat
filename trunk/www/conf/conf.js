'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _develop = require('./env/develop');

var _develop2 = _interopRequireDefault(_develop);

var _production = require('./env/production');

var _production2 = _interopRequireDefault(_production);

var _test = require('./env/test');

var _test2 = _interopRequireDefault(_test);

var _wangxuguang = require('./env/wangxuguang');

var _wangxuguang2 = _interopRequireDefault(_wangxuguang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conf = _develop2.default;

if (process.env.NODE_ENV === "production") {
  conf = _production2.default;
} else if (process.env.NODE_ENV === "test") {
  conf = _test2.default;
} else if (process.env.NODE_ENV === "wangxuguang") {
  conf = _wangxuguang2.default;
}

conf['index'] = '/index.html';
conf['sys_cache_key'] = 'sys_wechat';
exports.default = conf;