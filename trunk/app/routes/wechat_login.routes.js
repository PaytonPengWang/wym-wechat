import babelPolyfill    from 'babel-polyfill';
import koaRouter        from 'koa-router';
import controller from '../controller/wechat_login.controller';

let router = koaRouter();

router.put('/wechat_login',controller.verifyPhone);

router.get('/wechat_login/captcha',controller.captcha);
router.put('/wechat_login/save',controller.saveWeChat);
router.get('/wechat_login/code',controller.loginByCode);
export default router.routes();