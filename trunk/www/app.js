'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaValidate = require('koa-validate');

var _koaValidate2 = _interopRequireDefault(_koaValidate);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaStaticCache = require('koa-static-cache');

var _koaStaticCache2 = _interopRequireDefault(_koaStaticCache);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _artTemplate = require('art-template');

var _artTemplate2 = _interopRequireDefault(_artTemplate);

var _cache = require('./lib/cache');

var _cache2 = _interopRequireDefault(_cache);

var _httpUtils = require('./lib/httpUtils');

var _httpUtils2 = _interopRequireDefault(_httpUtils);

var _wechat = require('./lib/wechat.api');

var _wechat2 = _interopRequireDefault(_wechat);

var _wechat3 = require('./lib/wechat.oauth');

var _wechat4 = _interopRequireDefault(_wechat3);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _koaLoginInterceptor = require('koa-login-interceptor');

var _koaLoginInterceptor2 = _interopRequireDefault(_koaLoginInterceptor);

var _conf = require('./conf/conf');

var _conf2 = _interopRequireDefault(_conf);

var _html = require('./routes/html.routes');

var _html2 = _interopRequireDefault(_html);

var _wechat5 = require('./routes/wechat.routes');

var _wechat6 = _interopRequireDefault(_wechat5);

var _wechat7 = require('./routes/wechat.api');

var _wechat8 = _interopRequireDefault(_wechat7);

var _register = require('./routes/register.routes');

var _register2 = _interopRequireDefault(_register);

var _wechat_login = require('./routes/wechat_login.routes');

var _wechat_login2 = _interopRequireDefault(_wechat_login);

var _execution = require('./routes/execution.routes');

var _execution2 = _interopRequireDefault(_execution);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _koa2.default)(); /*
                                    200 请求成功
                                    404 请求路径错误
                                    500 请求失败
                                */

(0, _koaValidate2.default)(app);

_artTemplate2.default.config('cache', false);
_artTemplate2.default.config('compress', true);
_artTemplate2.default.config('base', _path2.default.join(__dirname, 'views'));
_artTemplate2.default.config('extname', '.html');

app.context.httpUtils = _httpUtils2.default;
app.context.cacheUtils = _cache2.default;
app.context.config = _conf2.default;
app.context.wechatAPI = _wechat2.default;
app.context.wechatOauth = _wechat4.default;

app.context.render = function (t, data) {
    if (!data) {
        data = {};
    }
    data['session'] = this.e_session;
    data['query'] = this.query;
    data['params'] = this.params;
    data['body'] = this.request.body;
    data['config'] = this.config;
    this.body = (0, _artTemplate2.default)(t, data);
};

app.use((0, _koaBody2.default)());

app.use((0, _koaStaticCache2.default)(_path2.default.join(__dirname, 'public'), {
    /*maxAge: 365 * 24 * 60 * 60*/
    maxAge: 1
}));

/* form不支持put请求，使用post，加上隐藏字段的方式提交 */
app.use(regeneratorRuntime.mark(function _callee(next) {
    var method;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    method = this.query._method;

                    if (method) {
                        this.method = method.toUpperCase();
                    }
                    _context.next = 4;
                    return next;

                case 4:
                    return _context.abrupt('return', _context.sent);

                case 5:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}));

/* 日志处理 */
app.use(regeneratorRuntime.mark(function _callee2(next) {
    var startTime, endTime, processTime;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    startTime = _lodash2.default.now();
                    _context2.next = 3;
                    return next;

                case 3:
                    endTime = _lodash2.default.now();
                    processTime = endTime - startTime;

                    console.log(this.method + " " + this.originalUrl + " " + processTime + "ms " + this.status);

                case 6:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, this);
}));

/* 错误处理 */
app.use(regeneratorRuntime.mark(function _callee3(next) {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.prev = 0;
                    _context3.next = 3;
                    return next;

                case 3:
                    _context3.next = 10;
                    break;

                case 5:
                    _context3.prev = 5;
                    _context3.t0 = _context3['catch'](0);

                    this.status = _context3.t0.status || 500;
                    this.response.statusString = _context3.t0.message;
                    this.body = _context3.t0.message;

                case 10:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _callee3, this, [[0, 5]]);
}));

if (process.env.NODE_ENV === "production") {
    /* 生产环境不允许跨域 */
} else {
    app.use(regeneratorRuntime.mark(function _callee4(next) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        this.set('Access-Control-Allow-Origin', '*');
                        this.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
                        _context4.next = 4;
                        return next;

                    case 4:
                        return _context4.abrupt('return', _context4.sent);

                    case 5:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
}

/* 登录验证 */
/*app.use(function *(next){
    let token = this.cookies.get('token');
    var enterpriseSession =yield this.cacheUtils.getCache(token,'enterpriseDocInfo');
    this.e_session = enterpriseSession;
    return yield next;
});*/
/* 登录验证 */
/*app.use(function *(next){

    if(this.originalUrl.split('?')[0].endsWith('.html')){
        return yield next;
    }

    let ignoreUri = [
        "/wechat/api/oauth2_url",
        "/wechat/login",
        "/wechat_login",
        "/wechat_login/captcha",
        "/wechat_login/save",
        "/wechat_login/code",
        "/wechat/api/config"
    ];


    for (let iIndex = 0; iIndex < ignoreUri.length; iIndex++) {
      if (this.originalUrl.split('?')[0] == ignoreUri[iIndex]) {
        return yield next;
      }
    }

    let token = this.cookies.get('token');

    if(!token){
        this.throw('not_login',500);
        return;
    }

    var session =yield this.cacheUtils.getCache(token,'session');

    if(!session){
        this.throw('not_login',500);
        return;
    }

    if(!session.id){
        this.throw('not_login',500);
        return;
    }

    this.u_session = session;
    return yield next;
})*/

app.use(_wechat6.default);
app.use(_wechat8.default);
app.use(_html2.default);
app.use(_register2.default);
app.use(_wechat_login2.default);
app.use(_execution2.default);

/* 404错误处理 */
app.use(regeneratorRuntime.mark(function _callee5(next) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
            switch (_context5.prev = _context5.next) {
                case 0:
                    _context5.next = 2;
                    return next;

                case 2:
                    if (this.status == 404) {
                        this.throw('请求路径错误', 404);
                    }

                case 3:
                case 'end':
                    return _context5.stop();
            }
        }
    }, _callee5, this);
}));

/* validator错误处理 */
app.use(regeneratorRuntime.mark(function _callee6(next) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
            switch (_context6.prev = _context6.next) {
                case 0:
                    if (this.errors) {
                        this.status = 500;
                        this.body = this.errors;
                    }
                    _context6.next = 3;
                    return next;

                case 3:
                case 'end':
                    return _context6.stop();
            }
        }
    }, _callee6, this);
}));

var server = app.listen(_conf2.default.port, function () {
    console.log('koa is linsting to http://127.0.0.1:' + _conf2.default.port);
});