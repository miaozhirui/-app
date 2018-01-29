var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Category = require('../models/categories');
var AppId = require('../models/appId');
var fs = require('fs');

router.use(function (req, res, next) {

    if (!req.userInfo.isAdmin) {

        res.send('对不起，只有管理员才能登入这个页面');
        return;
    }

    next();
})

//后台首页
router.get('/index', function (req, res) {

    res.render('admin/index', {

        userInfo: req.userInfo
    });

})

//用户列表首页
router.get('/userlist', function (req, res) {

    var currentPage = Number(req.query.page) || 1;


    User.count().then(function (count) {

        var limit = 4;
        var pages = Math.ceil(count / limit);

        if (currentPage < 1) {

            currentPage = 1;
        }

        if (currentPage > pages) {

            currentPage = pages;
        }

        var skip = (currentPage - 1) * limit;

        User.find().skip(skip).limit(limit).then(function (userlist) {

            res.render('admin/userlist', {

                userInfo: req.userInfo,
                userlist: userlist,
                currentPage: currentPage,
                pages: pages
            })
        })
    })


})

//分类列表
router.get('/categoryList', function (req, res) {

    Category.count().then(function (count) {

        var currentPage = Number(req.query.page) || 1;
        var limit = 4;
        var pages = Math.ceil(count / limit);

        if (currentPage < 1) {

            currentPage = 1;
        }

        if (currentPage > pages) {

            currentPage = pages;
        }

        var skip = (currentPage - 1) * limit;

        Category.find().skip(skip).limit(limit).then(function (categoryList) {

            res.render('admin/categoryList', {

                userInfo: req.userInfo,
                categoryList: categoryList,
                pages: pages,
                currentPage: currentPage
            })
        })
    })

})

//分类添加
router.get('/categoryAdd', function (req, res) {

    res.render('admin/categoryAdd', {

        userInfo: req.userInfo
    });
})

router.post('/categoryAdd', function (req, res) {

    var categoryName = req.body.category;

    if (categoryName == '') {

        res.render('admin/error', {

            userInfo: req.userInfo,
            message: '栏目名称不能为空'
        })

        return;
    }

    Category
        .findOne({

            name: categoryName

        })
        .then(function (data) {

            if (data) {

                res.render('admin/error', {

                    userInfo: req.userInfo,
                    message: '所填写的栏目，数据库中已经存在了'
                })
                return Promise.reject();
            }

            return new Category({
                name: categoryName
            }).save();
        })
        .then(function (data) {

            res.render('admin/success', {

                userInfo: req.userInfo,
                message: '提交成功，返回分类列表页面',
                url: '/admin/categoryList'
            })

        })
})

//appId管理
router.get('/appIdAdd', function (req, res) {

    res.render('admin/appIdAdd', {

        userInfo: req.userInfo
    })
})

router.post('/appIdAdd', function (req, res) {

    var body = req.body;
    var appName = body.appName,
        appTag = body.appTag,
        appId = body.appId,
        appSecret = body.appSecret;

    AppId
        .findOne({

            appId: appId
        })
        .then(function (data) {
            console.log(data);
            if(data){

                res.json({

                    code:1,
                    message: '已经添加过该小程序了',
                    data: ''
                })
                return Promise.reject();
            }

            return new AppId({
                appName: appName,
                appTag: appTag,
                appId: appId,
                appSecret: appSecret
            }).save();
        })
        .then(function (data) {

            res.json({
                code:0,
                message:"添加成功"
            })

            return;
        })

})

router.get('/appIdList', function (req, res) {

    AppId.find().sort({_id: 'desc'}).then(function (appList) {

        res.render('admin/appIdList', {
            appList: appList,
            userInfo: req.userInfo
        })
    })


})

router.get('/appIdDelete', function (req, res) {

    var appId = req.query.appId;

    AppId.remove({

        appId: appId
    }, function (error) {

        if(error){

            console.error(error);
            return;
        }

        res.json({

            code: 0,
            message: '删除成功'
        })
    })
})

router.get('/publishApp', function (req, res) {

    var appIdsPath = "/usr/local/www/wxapp/config/appIds.json";


    AppId
        .find()
        .then(function (data) {

            var appIds = {};

            data.forEach(function (item, index) {

                var temObj = {
                    appId: item.appId,
                    appSecret: item.appSecret
                }
                appIds[item.appTag] = temObj;
            })

            fs.writeFile(appIdsPath, JSON.stringify(appIds), function (err) {

                if(err){

                    res.json({

                        code: 1,
                        message: err
                    })
                } else {

                    res.json({

                        code: 0,
                        message: '发布成功'
                    })
                }
            })

        })

})



module.exports = router;



