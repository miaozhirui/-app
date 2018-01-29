var mongoose = require('mongoose');

module.exports = new mongoose.Schema({

    appId:String,//小程序的appid
    appTag: String,//小程序标识
    appSecret: String,//小程序的名称
    appName: String//小程序的名称
})