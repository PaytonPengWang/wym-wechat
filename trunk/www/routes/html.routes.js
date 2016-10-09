'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaRouter2.default)();

router.get('/', regeneratorRuntime.mark(function _callee(next) {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          this.redirect('/index.html');
          _context.next = 3;
          return next;

        case 3:
          return _context.abrupt('return', _context.sent);

        case 4:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, this);
}));

router.get('/:page.html', regeneratorRuntime.mark(function _callee2(next) {
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          this.render(this.params.page);
          _context2.next = 3;
          return next;

        case 3:
          return _context2.abrupt('return', _context2.sent);

        case 4:
        case 'end':
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

router.get('/:page/:page2.html', regeneratorRuntime.mark(function _callee3(next) {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          this.render(this.params.page + "/" + req.params.page2);
          _context3.next = 3;
          return next;

        case 3:
          return _context3.abrupt('return', _context3.sent);

        case 4:
        case 'end':
          return _context3.stop();
      }
    }
  }, _callee3, this);
}));

router.get('/:page/:page2/:page3.html', regeneratorRuntime.mark(function _callee4(next) {
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          this.render(this.params.page + "/" + req.params.page2 + "/" + this.params.page3);
          _context4.next = 3;
          return next;

        case 3:
          return _context4.abrupt('return', _context4.sent);

        case 4:
        case 'end':
          return _context4.stop();
      }
    }
  }, _callee4, this);
}));

exports.default = router.routes();