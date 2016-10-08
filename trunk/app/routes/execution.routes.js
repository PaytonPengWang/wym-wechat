import babelPolyfill    from 'babel-polyfill';
import koaRouter        from 'koa-router';
import controller from '../controller/execution.controller';

let router = koaRouter();

router.get('/execution/paging',controller.paging);

router.get('/execution/selfPaging',controller.selfPaging);
router.get('/execution/findById/:id',controller.findById);
router.get('/execution/findByIdUid/:id',controller.findByIdUid);
router.get('/execution/acceptById/:id',controller.acceptById);
router.get('/execution/selfInCome',controller.selfInCome);
export default router.routes();
