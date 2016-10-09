'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _wymHttpUtils = require('wym-http-utils');

var _wymHttpUtils2 = _interopRequireDefault(_wymHttpUtils);

var _conf = require('../conf/conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var httpUtils = new _wymHttpUtils2.default(_conf2.default.httpUtils);

exports.default = httpUtils;