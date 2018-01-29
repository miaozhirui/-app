/**
 * Created by mzr on 2018/1/16.
 */
var express = require('express');
var Router = express.Router();

Router.get('/index_posInfo.json', function (req, res) {

    var data = {


        pos1: {
            title: "今日推荐",
            content: [{
                title1: "龙卡途牛旅游卡",
                title2: "途牛消费98折",
                src: "http://m.credan.com/static/images/test.png",
                link:"http:www.baidu.com"
            }, {
                title1: "可妮兔粉丝信用卡",
                title2: "粉丝积分礼遇",
                src: "http://m.credan.com/static/images/test.png",
                link:""
            }, {
                title1: "粉丝积分礼遇",
                title2: "送爱奇艺会员11",
                src: "http://m.credan.com/static/images/test.png",
                link:""
            }]
        },

        pos2: {
            title: "热门银行",
            content: [{
                title1: "中信银行",
                title2: "年底必备大额",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            }, {
                title1: "平安银行",
                title2: "周三享五折",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            }, {
                title1: "光大银行",
                title2: "周三狠减单",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            }, {
                title1: "浦发银行",
                title2: "网络申请 当天下卡",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            }, {
                title1: "浦发银行",
                title2: "网络申请 当天下卡",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            }, {
                title1: "浦发银行",
                title2: "网络申请 当天下卡",
                src: "http://m.credan.com/static/images/test.png",
                link: ""

            }]
        },

        pos3: {

            title: "",
            content: [{
                title1: "进度查询",
                title2: "年底必备大额",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            }, {
                title1: "信用卡激活",
                title2: "年底必备大额",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            }, {
                title1: "办卡攻略",
                title2: "年底必备大额",
                src: "http://m.credan.com/static/images/test.png",
                link: ""

            }, {
                title1: "信用卡代还",
                title2: "年底必备大额",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            }]
        },

        pos4: {

            title: "主题精选",
            content: [{
                title1: "2017年推荐",
                title2: "最值得办的浦发卡",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            },{
                title1: "2017年推荐",
                title2: "最值得办的浦发卡",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            },{
                title1: "2017年推荐",
                title2: "最值得办的浦发卡",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            },{
                title1: "2017年推荐",
                title2: "最值得办的浦发卡",
                src: "http://m.credan.com/static/images/test.png",
                link: ""
            }]
        }
    }

    res.json({
        code:0,
        data: data,
        message: ''
    })
})

module.exports = Router;