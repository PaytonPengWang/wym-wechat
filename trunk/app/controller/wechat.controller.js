import babelPolyfill    from 'babel-polyfill';
import coWechat         from 'co-wechat';
import config           from '../conf/conf';
/* 事件处理 */
import events           from './wechat.controller.lib/event';

let wechatCtr = function*(next){
  /* 微信的业务逻辑 */
  let wx_msg = this.weixin;
  

  /* 事件消息 */
  if(wx_msg.MsgType==='event'){
    let eventHandler = events[wx_msg.Event];
    if(!eventHandler){
      this.throw('非法事件',500);
      return yield next;
    }

    yield eventHandler.call(this);

  }
};


export default new coWechat({
  token : config.wechat.token,
  encodingAESKey : config.wechat.encodingAESKey,
  appid : config.wechat.appid
}).middleware(wechatCtr);



