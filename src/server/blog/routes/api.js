
var express = require('express');
var router = express.Router();
var User = require('../models/users');

var responseData;

router.use(function(req, res, next) {

    responseData = {

        code: 0,
        message: ''
    }

    next();
})

router.get('/user', function(req, res) {

    res.send('api - user');
})

//注册
router.post('/register', function(req, res){

    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;

    if(username == '') {

        responseData.code = 1;
        responseData.message = '用户名不能为空'
        res.json(responseData);
        return;
    }

    if(password == ''){

        responseData.code = 2;
        responseData.message = '密码不能为空';
        res.json(responseData);
        return;
    }

    if(password != repassword) {

        responseData.code = 3;
        responseData.message = "两次输入的密码不一样";
        res.json(responseData);
        return;
    }
    
    User.findOne({

        username: username
    }).then(function(data) {

        if(data){
            
            responseData.code = 4;
            responseData.message = "该用户已经被注册了"
            res.json(responseData);
            return;
        }

        var user = new User({

            username: username,
            password: password
        })

        return user.save();
    }).then(function(newUserInfo){

        responseData.message = "注册成功";
        res.json(responseData);
    })

})

//登录
router.post('/login', function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    if(username == '' || password == '') {

        responseData.code = 1;
        responseData.message = "用户名或者密码不能为空";
        res.json(responseData);
        return;
    }

    User.findOne({

        username: username,
        password: password
    })
    .then(function(userInfo){

        if(!userInfo){

            responseData.code =2;
            responseData.message = "用户名或者密码错误";
            res.json(responseData);
            return;
        }
        
        req.cookie.set('userInfo', JSON.stringify({

            _id: userInfo._id,
            username: userInfo.username
        }))
        responseData.message = "登录成功";
        res.json(responseData);
        
        return;
    })
})

router.get('/logout', function(req, res) {

    req.cookie.set('userInfo', null)

    responseData.code = 0;
    responseData.message = "退出成功";
    res.json(responseData);
    return;
})
module.exports = router;









