import babelPolyfill    from 'babel-polyfill';
import koaRouter        from 'koa-router';
import wechatApiController from '../controller/wechat.api'

let router = koaRouter();

router.get('/wechat/api/config',wechatApiController.config);
router.get('/wechat/api/oauth2_url',wechatApiController.oath2Url)


export default router.routes();
