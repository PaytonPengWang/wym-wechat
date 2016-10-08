import WechatOAuth from 'co-wechat-oauth';
import config from '../conf/conf';

var client = new WechatOAuth(config.wechat.appid, config.wechat.appsecret);

export default client;
