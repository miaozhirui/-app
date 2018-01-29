var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var config = require('./config');
var querystring = require('querystring');
var request = require('request');


exports.reply = function *(next, callback) {

    var body = JSON.parse(this.body);
    var openId = body.FromUserName;
    var sessionForm = body.SessionFrom;
    var self = this;

    console.log(sessionForm);

    if (sessionForm === 'test') {

        this.replyInfo = {

            "touser": openId,
            "msgtype": "text",
            "text": {

                "content": "联系客服qq:1078142728\n获取更信息哦!"
            }
        }

        callback();
    }

    //推荐位置
    if (sessionForm.indexOf('pos') > -1) {

        var query = querystring.parse(sessionForm);
        console.log(query);
        var url = 'https://api.credan.com/v3/getRecommendation';

        request(url, {

            method: 'post',

            body: {
                pageKey: query.pageKey
            },
            json: true

        }, function (err, response, body) {


            if (err) {
                console.error(err);
                return;
            }

            if (body.code == 0) {

                var data = body.data;
                var basePic = data.basePic;

                var currentPos = data.data[query.pos][query.index];
                var url = currentPos.link.split('|')[0].slice(4);

                self.replyInfo = {

                    "touser": openId,
                    "msgtype": "link",
                    "link": {
                        "title": currentPos.title,
                        "description": currentPos.caption,
                        "url": url,
                        "thumb_url": basePic + currentPos.logoUri
                    }
                }

                callback && callback();
            } else {

                console.error('message');
            }
        })

    }

    // yield next;

}

