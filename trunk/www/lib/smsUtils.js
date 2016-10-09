'use strict';

var _conf = require('../conf/conf');

var _conf2 = _interopRequireDefault(_conf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var crypto = require('crypto');
var http = require('request');
var qs = require('querystring');
var tempPwd = _conf2.default.sms.pwd;
var sn = _conf2.default.sms.sn;
var sign = _conf2.default.sms.sign;
var iconv = require('iconv-lite');

var md5sum = crypto.createHash('md5');
var t = sn + tempPwd;
t = t.trim();
md5sum.update(t);
var pwd = md5sum.digest('hex').toUpperCase(),
    xml2js = require('xml2js'),
    xmlParser = new xml2js.Parser();

var encodeGB2312 = function encodeGB2312(content) {
    var gb2312 = iconv.encode(content, 'GB2312');
    var chars = "";
    for (var iIndex = 0; iIndex < gb2312.length; iIndex++) {
        var char = gb2312[iIndex].toString(16);
        chars += "%" + char;
    }
    return chars;
};

exports.send = function (mobile, content) {
    return new Promise(function (resolve, reject) {
        var data = "sn=" + sn + "&pwd=" + pwd + "&mobile=" + mobile + "&content=" + encodeGB2312(content + "【微云媒】") + "&ext=&stime=&rrid=";
        http({
            encode: null,
            url: 'http://sdk2.zucp.net:8060/webservice.asmx/mt?' + data
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                xmlParser.parseString(body, function (err, result) {
                    if (result.string._.length > 3) {
                        resolve();
                    }
                });
            } else {
                reject(error);
            }
        });
    });
};