var Koa = require('koa');
var path = require('path');
var wechat = require('./wechat/g');
var weixin = require('./weixin');
var initConfig = require('./initConfig');

var app = new Koa();

app.use(initConfig);

app.use(wechat( weixin.reply));

app.listen(3002);

