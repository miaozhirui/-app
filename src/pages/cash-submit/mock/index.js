module.exports = {

    //查询用户信息  type=0
    //查询身份信息 type=1  //联系人信息 type=3  //更多人信息 type=4
    //运营商验证 type=2  //芝麻粉验证 type=5

    "/v2/cashloan/queryUserInfo": function(req, res) {

        if (req.body.type == 0) {

            var result = {
                "statusCode": 8015,
                "message": "用户验证状态",
                "data": {
                    "authorization": "20171205160020ec2cad6fcce2475e8d582b45c965dd55",
                    "cashId": "null",
                    "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                    "identity": true,
                    "more": true,
                    "zhima": false,
                    "contact": true,
                    "mobile": true,
                    "type": 0,
                    "userId": "78a2e2aaeacb40849b89e343e20b0b3c",
                    "productType": "4"
                },
                "success": true
            }

        } else if (req.body.type == 10) {

            var result = {
                "statusCode": 8015,
                "message": "用户验证状态",
                "data": {
                    "authorization": "20171205160020ec2cad6fcce2475e8d582b45c965dd55",
                    "cashId": "null",
                    "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                    "identity": false,
                    "more": false,
                    "zhima": false,
                    "contact": false,
                    "mobile": false,
                    "type": 0,
                    "userId": "78a2e2aaeacb40849b89e343e20b0b3c",
                    "productType": "4"
                },
                "success": true
            }

        } else if (req.body.type == 1) { //查询身份信息

            var result = {
                "statusCode": 8015,
                "message": "用户信息",
                "data": {
                    "authorization": "20171205160020ec2cad6fcce2475e8d582b45c965dd55",
                    "cashId": "null",
                    "idNumValidDateEnd": "null",
                    "bankCard": "6214851217456776",
                    "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                    "name": "王总",
                    "type": 1,
                    "userId": "78a2e2aaeacb40849b89e343e20b0b3c",
                    "idNum": "370829199008273929",
                    "productType": "4",
                    "idAddress": "山东省济宁市",
                    "cardName": "上海市招商银行天钥桥路支行"
                },
                "success": true
            }

        } else if (req.body.type == 2) { //运营商验证


        } else if (req.body.type == 3) { //联系人信息

            var result = {
                "statusCode": 8015,
                "message": "用户信息",
                "data": {
                    "authorization": "20171205160020ec2cad6fcce2475e8d582b45c965dd55",
                    "cashId": "null",
                    "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                    "contact": [{
                            "relationType": 2,
                            "phone": "18801951989",
                            "name": "王总",
                            "rank": 1
                        },
                        {
                            "relationType": 4,
                            "phone": "18801951989",
                            "name": "王海",
                            "rank": 2
                        },
                        {
                            "relationType": 7,
                            "phone": "18801951989",
                            "name": "杨一",
                            "rank": 3
                        }
                    ],
                    "type": 3,
                    "userId": "78a2e2aaeacb40849b89e343e20b0b3c",
                    "productType": "4"
                },
                "success": true
            }

        } else if (req.body.type == 4) { //更多人信息

            var result = {
                "statusCode": 8015,
                "message": "用户信息",
                "data": {
                    "authorization": "20171205160020ec2cad6fcce2475e8d582b45c965dd55",
                    "annualEarning": null,
                    "workInfo": {
                        "profession": 1,
                        "specificAddr": "合川大厦",
                        "education": 4,
                        "companyType": 1,
                        "companyPhone": "02154377032",
                        "workAddr": {
                            "province": "上海市",
                            "city": "上海市",
                            "district": "黄浦区"
                        },
                        "liveTime": "2017-10",
                        "workName": "快睿登"
                    },
                    "cashId": "null",
                    "residentInfo": {
                        "specificAddr": "上海",
                        "liveTime": "2010-9",
                        "liveAddr": {
                            "province": "上海市",
                            "city": "上海市",
                            "district": "黄浦区"
                        }
                    },
                    "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                    "houseHoldAddress": null,
                    "lifeInfo": {
                        "household": 1,
                        "merriage": 1,
                        "spouse": 0
                    },
                    "type": 4,
                    "childSchool": {
                        "title": "",
                        "startDate": ""
                    },
                    "userId": "78a2e2aaeacb40849b89e343e20b0b3c",
                    "productType": "4"
                },
                "success": true
            }


        } else if (req.body.type == 5) { //芝麻粉验证


        }

        res.json(result);
    },

    "/v2/cashloan/finalSubmit": function(req, res) {

        var result = {
            // "statusCode": 10105,
            "statusCode": 200,
            "message": "提交验证",
            "data": {
                "cashId": "null",
                "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                "identity": true,
                "more": false,
                "zhima": false,
                "contact": true,
                "mobile": false,
                "type": 0,
                "userId": "46673d60a1f0417bb4085f6ea421ec48",
                "productType": 4
            },
            "success": true
        }

        res.json(result);
    },
    "/collect/zhima/authorize": function(req, res) {

        var result = { "status": 0, "code": 0, "success": true, "message": "授权URL成功", "data": "https://zmopenapi.zmxy.com.cn/openapi.do?charset=UTF-8&method=zhima.auth.info.authorize&channel=apppc&sign=AbzPj7xld%2Fp9Q0IgJwfpEN%2ByfpfZRk5ONGS0Z0htPfaUYYDocY4%2BIXT4VW%2BvqiMcGq83hBcGWgfecoA56nR%2Fr4KdjDjYSSQPkEw9S7Qhono%2BGOvAiaqAfqpKmsm0huRz6K7M7cRifCpXcHWTQ6NZjDI1WtuoyZ123LUxfsA0%2FFs%3D&version=1.0&app_id=1003000&sign_type=RSA&platform=zmop&params=ML23Oid6yrjLCw2XvGYzQoohPmkjJsIPJ%2FyV8txjou9NVZowQyge%2B5XrfEQk3lbO7X1UManjaEBOEjWimVhS9l%2B8cksmEnqlsS1cETEjP6KwTDjbrAMX%2Bdj6JKTWhSM5vlohjxlNTfTlZEt%2FrSDfC5lElyn3BWZwj0i0qjCEOKZU2BoRcSnnqnXpaItrJUbYKaRBqtb4sTxzUW%2FXrh4LvBCecXTRY4GbTgpmcBd4kEXiMEl%2FkDJjz8W0VLpPbsoN4NoubXXchnkS0cuGbmN3Gdp6XDH24E0DiL4fIPbIlRFsTyVW5zm%2B%2FtCPK4%2BGFggzIds59TzXLal6ga%2BSwE9tBS8bJUIcfHlcrD196sREqcJhJ2HYtVJhf%2F1P3lnGHbTl8xZcfe1P9DRItLJQ0slzBrO42rkK48h2TR%2B1Aa1SAb%2Bb5i0ZycrCQHBJmBCO3NCgTaEQbkc9s6Bg0xB5MC6K36BS%2FDMdeiQIqMnMNfL%2Bnz8Oizc0jlwRHFwjX51TTPaA" }

        res.json(result);
    },
    "/v16/iou/credatLoan": function(req, res) {

        var result = {

            code: 0,
            data: {

                result: 'ok'
            },
            message: '提示信息'
        }

        var result = {

            code: 1,
            data: {

                result: 'ok'
            },
            message: '有一笔为完成的订单'
        }

        res.json(result);
    }
}