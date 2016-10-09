'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = _callee;

var _marked = [_callee].map(regeneratorRuntime.mark);

function _callee(next) {
	var wx_msg, unionid, data, ret;
	return regeneratorRuntime.wrap(function _callee$(_context) {
		while (1) {
			switch (_context.prev = _context.next) {
				case 0:
					wx_msg = this.weixin;
					/*var $access_token = "5ic8RoqZd7IBUtE0aGXUhcdKBnrwlO1iqtvyJJUgIcDcopJIH7x90QH4yiK_z08fqp4WOD7kfKPDtET29BRYNZO-sSIITaxIj4u72LYAYcFH6t1fiSVzjUuqYWOtHiw0LGDorxx5Qj6SN0Z7GtYGTA";
     	var $openid=wx_msg.FromUserName;
     var $url = "https://api.weixin.qq.com/cgi-bin/user/info?access_token=$access_token&openid=$openid&lang=zh_CN";
     var $output = https.https_request($url);
     var_dump($output);*/

					unionid = "o-Q9Xv2eDs7MhHOBSZr0quC1D8vE";
					_context.next = 4;
					return this.httpUtils.request('/user.do', 'get', {
						unionid: unionid
					});

				case 4:
					data = _context.sent;

					if (!(data.status != 0)) {
						_context.next = 9;
						break;
					}

					this.throw("该微信用户不存在", 500);
					_context.next = 13;
					break;

				case 9:
					_context.next = 11;
					return this.httpUtils.request('/user/ ' + data.result.id + '.do', 'put', {
						id: data.result.id,
						gzptWechatId: ""
					});

				case 11:
					ret = _context.sent;

					if (ret.status != 0) {
						this.throw(ret.message, 500);
					} else {
						this.body = "success";
					}

				case 13:
				case 'end':
					return _context.stop();
			}
		}
	}, _marked[0], this);
}