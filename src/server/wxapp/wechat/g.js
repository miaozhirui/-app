var sha1 = require('sha1');
var getRawBody = require('raw-body');
var Wechat = require('./wechat');
var util = require('./util');

module.exports = function(handler) {

    return function *(next) {

        var opt = this.appConfig;

        var wechat = new Wechat(opt);

        var signature = this.query.signature;
        var echostr = this.query.echostr;
        var nonce = this.query.nonce;
        var timestamp = this.query.timestamp;
        var self = this;

        var str = [nonce, timestamp, opt.token].sort().join('');
        var sha = sha1(str);

        if(this.method === 'GET') {

            if(sha === signature) {

                this.body = echostr;

            } else {

                this.body = 'wrong';
            }


        } else if(this.method === 'POST') {

            if(sha !== signature) {

                this.body = 'wrong';

                return false;
            }

            //得到原始的请求体
            var body = yield getRawBody(this.req, {
                length: this.req.headers['content-length'],
                limit: '1mb',
                encoding: true
            });

            this.body = body;

            //用来定义回复各种消息
            yield handler.call(this, next, function () {

                //最终回复
                wechat.reply.call(self, opt);
            });


        }



    }
}