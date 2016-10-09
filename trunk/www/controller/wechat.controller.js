'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _coWechat = require('co-wechat');

var _coWechat2 = _interopRequireDefault(_coWechat);

var _conf = require('../conf/conf');

var _conf2 = _interopRequireDefault(_conf);

var _event = require('./wechat.controller.lib/event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wechatCtr = regeneratorRuntime.mark(function wechatCtr(next) {
  var wx_msg, eventHandler;
  return regeneratorRuntime.wrap(function wechatCtr$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          /* 微信的业务逻辑 */
          wx_msg = this.weixin;

          /* 事件消息 */

          if (!(wx_msg.MsgType === 'event')) {
            _context.next = 10;
            break;
          }

          eventHandler = _event2.default[wx_msg.Event];

          if (eventHandler) {
            _context.next = 8;
            break;
          }

          this.throw('非法事件', 500);
          _context.next = 7;
          return next;

        case 7:
          return _context.abrupt('return', _context.sent);

        case 8:
          _context.next = 10;
          return eventHandler.call(this);

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, wechatCtr, this);
});
/* 事件处理 */
exports.default = new _coWechat2.default({
  token: _conf2.default.wechat.token,
  encodingAESKey: _conf2.default.wechat.encodingAESKey,
  appid: _conf2.default.wechat.appid
}).middleware(wechatCtr);