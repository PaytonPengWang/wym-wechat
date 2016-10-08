import babelPolyfill  from 'babel-polyfill';
import koaRouter      from 'koa-router';

let router = koaRouter();

router.get('/',function*(next){
  this.redirect('/index.html');
  return yield next;
})

router.get('/:page.html',function*(next){
  this.render(this.params.page);
  return yield next;
});

router.get('/:page/:page2.html',function*(next){
  this.render(this.params.page + "/" + req.params.page2);
  return yield next;
});

router.get('/:page/:page2/:page3.html',function*(next){
  this.render(this.params.page + "/" + req.params.page2 + "/" + this.params.page3);
  return yield next;
});


export default router.routes();
