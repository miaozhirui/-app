var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = new Schema({

    //用户名
    username: String,
    //密码
    password: String,
    //是否是管理员
    isAdmin: {

        type: Boolean,
        defalut: false
    }
})