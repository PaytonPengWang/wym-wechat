import babelPolyfill    from 'babel-polyfill';
import koaRouter        from 'koa-router';
import wechatController from '../controller/wechat.controller'

let router = koaRouter();

router.all('/wechat',wechatController)


export default router.routes();
