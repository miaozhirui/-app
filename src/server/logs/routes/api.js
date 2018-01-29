var express = require('express');
var Router = express.Router();

var responseData = {};

Router.use(function(req, res, next) {

    responseData = {
        code: 0,
        message: '操作正确'
    }
    next();
})

Router.post('/submitOverDue', function(req, res) {

    var submitInfo = req.body;
    platform = submitInfo.platform;
    money = submitInfo.money;
    phone = submitInfo.phone;
    time = Math.round(new Date().getTime() / 1000);

    if (platform == '') {

        responseData.code = 1;
        responseData.message = "请输入平台信息";
        res.json(responseData);
        return;
    }

    if (money == '') {

        responseData.code = 1;
        responseData.message = "请输入金额信息";
        res.json(responseData);
        return;
    }

    if (phone == '') {

        responseData.code = 1;
        responseData.message = "请输入手机号";
        res.json(responseData);
        return;
    }

    var overdue = { platform, money, phone, time }

    try {

        req.connection.query('SELECT * FROM overdue WHERE phone = ?', [phone], function(error, results, fields) {
            if (error) throw error;

            if (results.length === 0) {

                req.connection.query('INSERT INTO overdue set ?', overdue, function(error, result, field) {

                    if (error) throw error;

                    responseData.message = "成功";
                    responseData.data = true;
                    res.json(responseData);

                })
            } else {

                responseData.code = 1;
                responseData.message = "您已经提交过了";
                res.json(responseData);
            }
        })

    } catch (e) {

        console.log(e);
    }

})


module.exports = Router;