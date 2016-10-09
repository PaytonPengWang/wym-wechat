'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _babelPolyfill = require('babel-polyfill');

var _babelPolyfill2 = _interopRequireDefault(_babelPolyfill);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _execution = require('../controller/execution.controller');

var _execution2 = _interopRequireDefault(_execution);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _koaRouter2.default)();

router.get('/execution/paging', _execution2.default.paging);

router.get('/execution/selfPaging', _execution2.default.selfPaging);
router.get('/execution/findById/:id', _execution2.default.findById);
router.get('/execution/findByIdUid/:id', _execution2.default.findByIdUid);
router.get('/execution/acceptById/:id', _execution2.default.acceptById);
router.get('/execution/selfInCome', _execution2.default.selfInCome);
exports.default = router.routes();