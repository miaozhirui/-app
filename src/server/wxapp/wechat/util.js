var xml2js = require('xml2js');
var Promise = require('bluebird');
var tpl = require('./tpl');

exports.xml2js = function(xml) {

    return new Promise(function(resolve, reject) {

        xml2js.parseString(xml, function(err, result) {


            if(err) {

                reject(err);
            } else {

                resolve(result);
            }
        })
    })

}

exports.formatMessage = formatMessage;

function formatMessage(message) {

    return new Promise(function(resolve, reject) {

        var data = {};

        var keys = Object.keys(message);

        for(var i=0; i < keys.length; i++) {

            var item = message[keys[i]];

            if(item.length == 1) {

                data[keys[i]] = item[0];
            }
        }

        resolve(data);

    })
}

exports.tpl = function(content, message) {

    var info = {};
    var type = 'text';
    var fromUserName = message.FromUserName;
    var toUserName = message.ToUserName;

    console.log(content);
    if(Array.isArray(content)) {

        type = 'news';
    }

    type = content.type || type;
    info.content = content;
    info.createTime = new Date().getTime();
    info.msgType = type;
    info.toUserName = fromUserName;
    info.fromUserName = toUserName;

    return tpl.compiled(info);
}

