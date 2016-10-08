import develop from './env/develop';
import production from './env/production';
import test from './env/test';
import wangxuguang from './env/wangxuguang';

var conf = develop;

if(process.env.NODE_ENV === "production"){
  conf = production;
}else if(process.env.NODE_ENV === "test"){
  conf = test;
}else if(process.env.NODE_ENV==="wangxuguang"){
	conf = wangxuguang;
}

conf['index'] = '/index.html';
conf['sys_cache_key'] = 'sys_wechat';
export default conf;

