var Promise = require('bluebird');
var request = Promise.promisify(require('request'));
var util = require('./util');

var prefix = 'https://api.weixin.qq.com/cgi-bin/';
var api = {

    accessToken: prefix + 'token?grant_type=client_credential',

}



var Wechat = function(opt) {

    this.appID = opt.appId;
    this.appsecret = opt.appSecret;
    this.getAccessToken = opt.getAccessToken;
    this.saveAccessToken = opt.saveAccessToken;

    this.getFinalAccessToken();

}

Wechat.prototype.getFinalAccessToken = function(getAccessToken){

    var getAccessToken = this.getAccessToken;
    var self= this;

    return new Promise(function(resolve, reject) {

        getAccessToken()
            .then(function(data) {

                try{

                    var data = JSON.parse(data);
                }catch (e) {

                    return self.updateAccessToken();
                }


                if(self.validAccessToken(data)) {

                    return data;
                } else {

                    return self.updateAccessToken();
                }
            })
            .then(function(data) {

                self.access_token = data.access_token;
                self.expires_in = data.expires_in;

                var data = JSON.stringify(data);
                self.saveAccessToken(data).then(function(data){

                    resolve(data);
                })
            })
    })

}

Wechat.prototype.validAccessToken = function(data) {

    var now = new Date().getTime();

    if(now > data.expires_in) {

        return false;
    }

    return true;
}

Wechat.prototype.updateAccessToken = function(data) {

    var self = this;

    return new Promise(function(resolve, reject) {

        var url = api.accessToken + `&appid=${self.appID}&secret=${self.appsecret}`;

        request(url, {json:true}).then(function (response) {

            var data = response.body;

            data.expires_in = (new Date().getTime()) + (response.body.expires_in - 20)*1000;

            resolve(data);
        })
    })

}

Wechat.prototype.reply = function(opt) {

    var wechat = new Wechat(opt)
    var self = this;

    console.log(self.replyInfo);
    wechat.getFinalAccessToken().then(function(data){

        var access_token = data.access_token;

        var url = "https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=" + wechat.access_token;

        request({

            method: 'post',
            url: url,
            headers:{
                contentType: 'application/json'
            },
            body:JSON.stringify(self.replyInfo)
        }).then(function (data) {

            console.log(data.body);
        }, function(){
            console.log('失败了')
        })
    })



}

module.exports = Wechat;
