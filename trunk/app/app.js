/*
    200 请求成功
    404 请求路径错误
    500 请求失败
*/
import koa                      from 'koa';
import koaValidate              from 'koa-validate';
import koaBody                  from 'koa-body';
import koaStatic                from 'koa-static-cache';
import path                     from 'path';
import template                 from 'art-template';
import cache                    from './lib/cache';
import httpUtils                from './lib/httpUtils';
import wechatAPI                from './lib/wechat.api';
import wechatOauth                from './lib/wechat.oauth';
import _                        from 'lodash';
import koaLoginInterceptor      from 'koa-login-interceptor';
import config                   from './conf/conf';

import htmlRoutes               from './routes/html.routes';
import wechatRoutes             from './routes/wechat.routes';
import wechatApiRoutes          from './routes/wechat.api';
import registerRoutes           from './routes/register.routes';
import loginRoutes              from './routes/wechat_login.routes';
import executionRoutes          from './routes/execution.routes';
var app = koa();
koaValidate(app);

template.config('cache',false);
template.config('compress',true);
template.config('base',path.join(__dirname,'views'));
template.config('extname','.html')

app.context.httpUtils  = httpUtils;
app.context.cacheUtils = cache;
app.context.config = config;
app.context.wechatAPI = wechatAPI;
app.context.wechatOauth = wechatOauth;

app.context.render = function(t,data){
    if(!data){
        data = {};
    }
    data['session'] = this.e_session;
    data['query'] = this.query;
    data['params'] = this.params;
    data['body'] = this.request.body;
    data['config'] = this.config;
    this.body = template(t,data);
}

app.use(koaBody());

app.use(koaStatic(path.join(__dirname,'public'),{
    /*maxAge: 365 * 24 * 60 * 60*/
    maxAge:1
}));

/* form不支持put请求，使用post，加上隐藏字段的方式提交 */
app.use(function*(next){
    var method = this.query._method;
    if(method){
        this.method = method.toUpperCase();
    }
    return yield next;
})

/* 日志处理 */
app.use(function *(next){
    var startTime = _.now();
    yield next;
    var endTime = _.now();
    var processTime = endTime - startTime;
    console.log(this.method + " "+this.originalUrl+" "+processTime+"ms "+this.status);
})

/* 错误处理 */
app.use(function *(next){
    try{
        yield next;
    }catch(err){
        this.status = err.status || 500;
        this.response.statusString = err.message;
        this.body = err.message;
    }
});

if(process.env.NODE_ENV === "production"){
    /* 生产环境不允许跨域 */
}else{
    app.use(function*(next){
        this.set('Access-Control-Allow-Origin','*');
        this.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        return yield next;
    })
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

app.use(wechatRoutes);
app.use(wechatApiRoutes);
app.use(htmlRoutes);
app.use(registerRoutes);
app.use(loginRoutes);
app.use(executionRoutes);

/* 404错误处理 */
app.use(function *(next){
    yield next;
  if(this.status==404){
    this.throw('请求路径错误',404);
  }
})

/* validator错误处理 */
app.use(function *(next){
    if(this.errors){
        this.status = 500;
        this.body = this.errors;
    }
    yield next;
})

var server =app.listen(config.port,function() {
    console.log('koa is linsting to http://127.0.0.1:'+config.port);
});


