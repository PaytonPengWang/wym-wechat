'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = _callee;

var _marked = [_callee].map(regeneratorRuntime.mark);

function _callee() {
	var wx_msg, wx_user, data, ret;
	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					wx_msg = this.weixin;
					_context.next = 3;
					return this.wechatAPI.getUser(wx_msg.FromUserName);

				case 3:
					wx_user = _context.sent;
					_context.next = 6;
					return this.httpUtils.request('/user.do', 'get', {
						unionid: unionid
					});

				case 6:
					data = _context.sent;

					if (!(data.status != 0)) {
						_context.next = 11;
						break;
					}

					this.throw("该微信用户不存在", 500);
					_context.next = 15;
					break;

				case 11:
					_context.next = 13;
					return this.httpUtils.request('/user.do', 'put', {
						id: data.result.id,
						gzptWechatId: wx_msg.FromUserName
					});

				case 13:
					ret = _context.sent;

					if (ret.status != 0) {
						/*this.throw(ret.message,500);*/
					} else {
						this.body = {
							content: wx_user.nickname + '，欢迎您加入微云媒',
							type: 'text'
						};
					}

				case 15:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this);
}