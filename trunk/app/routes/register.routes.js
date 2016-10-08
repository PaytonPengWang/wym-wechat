import babelPolyfill    from 'babel-polyfill';
import koaRouter        from 'koa-router';
import controller from '../controller/register.controller';

let router = koaRouter();

router.post('/register',controller.register);


export default router.routes();