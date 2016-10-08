import WechatAPI from 'co-wechat-api';
import config from '../conf/conf';

var api = new WechatAPI(config.wechat.appid, config.wechat.appsecret);

export default api;
