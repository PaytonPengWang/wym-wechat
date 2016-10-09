'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wymCache = require('wym-cache');

var _wymCache2 = _interopRequireDefault(_wymCache);

var _conf = require('../conf/conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _wymCache2.default(_conf2.default.cache.redisPort, _conf2.default.cache.redisHost, _conf2.default.cache.redisPwd);