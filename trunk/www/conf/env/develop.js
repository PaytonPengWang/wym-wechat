'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  "httpUtils": {
    fileServer: '',
    dataServer: '127.0.0.1',
    dataServerPort: '8080',
    clientId: 'admin',
    clientKey: 'admin'
  },
  "cache": {
    redisPort: 6379,
    redisHost: 'ad36b6f2ed004196.redis.rds.aliyuncs.com',
    redisPwd: 'WANGpeng1994'
  },
  "sms": {
    sn: 'SDK-BBX-010-24327',
    pwd: '7169-46#',
    sign: '【微云媒】'
  },
  "wechat": {
    token: "weiyunmei",
    encodingAESKey: "ICu6j3ROXPFFXrwrRLUxrOIDkyh4mHdq25T1yMuJgu7",
    appid: "wx35d60d6b610e0c83",
    appsecret: "f2b58c55d4bad018c6a74efa90ded192"
  },
  url: 'http://app.weiyunmei.cn/wechat_debug',
  //url : 'http://127.0.0.1:7004',
  file_server: "http://file.weiyunmei.cn",
  port: 7004
};