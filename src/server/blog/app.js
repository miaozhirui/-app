var express = require('express');
var app = express();
var swig = require('swig');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var Users = require('./models/users');

app.use('/public', express.static(__dirname+'/public'));//设置静态文件的目录

app.engine('html', swig.renderFile);

app.set('views', './views');
app.set('view engine', 'html');
swig.setDefaults({cache: false});

app.use( bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {

    req.cookie = new Cookies(req, res);

    req.userInfo = {}
    
    if(req.cookie.get('userInfo')){

        req.userInfo = JSON.parse(req.cookie.get('userInfo'));
        
        try{
            Users.findById(req.userInfo._id).then(function(userInfo) {

                req.userInfo.isAdmin = !!userInfo.isAdmin;
                next()
            })
        }catch(e){

            next();
        }
        
    } else {

        next()
    }

    
})


app.use('/admin', require('./routes/admin.js'));
app.use('/api', require('./routes/api.js'));
// app.use('/', require('./routes/main.js'));
// //注册页面
app.get('/register', function(req, res) {

    res.render('register');
})

//登录页面
app.get('/login', function(req, res) {

    res.render('login');
})

mongoose.connect('mongodb://60.205.231.190:27017/blog', function(error){

    if(error) {

        console.log('数据库连接失败')
        console.log(error)
    } else {

        console.log('数据库连接成功')
        app.listen(3001);
    }
});
