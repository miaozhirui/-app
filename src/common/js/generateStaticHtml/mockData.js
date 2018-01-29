export default {

    "/v16/app/login": function(req, res) {

        var result = {

            code: 0,
            data: {

                authorization: 'authorization',
                userId: 'userId'
            },
            message: '提示信息'
        }

        res.json(result);
    },
    "/v2/cashloan/submitOrderInfo": function(req, res) {

        var result = {
            "statusCode": 200,
            "message": "提交及时雨订单",
            "data": {
                "cashId": "null",
                "userId": "46673d60a1f0417bb4085f6ea421ec48",
                "productType": 1
            },
            "success": true
        }

        res.json(result);
    },
    "/v2/cashloan/queryUserInfo_0": function(req, res) {

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
                "productType": "4",

            },
            "success": true
        }

        res.json(result);
    },
    "/v2/cashloan/queryUserInfo_1": function(req, res) {

        var result = {
            "statusCode": 8015,
            "message": "用户信息",
            "data": {
                "authorization": "20171205160020ec2cad6fcce2475e8d582b45c965dd55",
                "cashId": "null",
                "idNumValidDateEnd": "null",
                "bankCard": "6214851217456776",
                "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                "name": "张三",
                "type": 1,
                "userId": "78a2e2aaeacb40849b89e343e20b0b3c",
                "idNum": "370829199008273929",
                "productType": "4",
                "idAddress": "山东省济宁市",
                "cardName": "上海市招商银行天钥桥路支行"
            },
            "success": true
        }

        res.json(result);
    },
    "/v2/cashloan/queryUserInfo_3": function(req, res) {

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

        res.json(result);
    },
    "/v2/cashloan/queryUserInfo_4": function(req, res) {

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

        res.json(result);
    },
    "/v2/user/file/showImg": function(req, res) {

        var result = {
            "statusCode": 200,
            "message": "查询成功",
            "data": {
                "filePath": {
                    "IDCARD_FACADE": "http://demo.credan.com/html/demo/c2c/1.0.0/zhengmian.png",
                    "HANDHELD_ID": "http://demo.credan.com/html/demo/c2c/1.0.0/defaultimg.png",
                    "IDACRD_REVERSE": "http://demo.credan.com/html/demo/c2c/1.0.0/fanmian.png"
                },
                "userId": "46673d60a1f0417bb4085f6ea421ec48",
                "productType": 4
            },
            "success": true
        }

        res.json(result);
    },
    //提交身份图片
    "/v2/user/file/uploadByUserId": function(req, res) {

        var result = {
            "statusCode": 7007, //7008 提交失败  //4000 参数错误，注册请从第一步开始
            "message": "upload success",
            "success": true,
            "data": {
                userId: "46673d60a1f0417bb4085f6ea421ec48"
            }
        }

        res.json(result);
    },
    //提交身份验证信息
    "/v2/cashloan/submitUserInfo": function(req, res) {

        var result = {
            "statusCode": 200, //7008 提交失败  //4000 参数错误，注册请从第一步开始
            "message": "upload success",
            "success": true,
            "data": {
                "userStatus": 3, //3 关闭微信浏览器 //2 merchantid 商户判断 //已验证
                "cashId": "",
                "name": "", //姓名
                "idNum": "", //身份证号
                "idAddress": "", //身份证地址
                "cardNum": "", //银行卡号
                "cashApplyId": null,
                "idNumValidDateEnd": null,
                 
                "isVerified": true,
                 
                "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                "productType": 4,
                 
                "userId": "46673d60a1f0417bb4085f6ea421ec48"
            }
        }

        res.json(result);
    },

    "/v2/user/collection/mobile/submit": function(req, res) {

        var result = {
            "statusCode": 1010,
            "message": "提交验证",
            "success": true
        }

        res.json(result);

    },
    //提交联系人的信息
    "/v2/cashloan/submitContactInfo": function(req, res) {

        var result = {
            "statusCode": 200,
            "message": "提交联系人信息成功",
            "data": {
                "cashId": "null",
                "contactInfo": [{
                        "relationType": "1",
                        "phone": "18801951984",
                        "name": "王一",
                        "rank": 1
                    },
                    {
                        "relationType": "4",
                        "phone": "18801951983",
                        "name": "王二",
                        "rank": 2
                    },
                    {
                        "relationType": "4",
                        "phone": "18801951989",
                        "name": "王三",
                        "rank": 3
                    }
                ],
                "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                "userId": "46673d60a1f0417bb4085f6ea421ec48",
                "productType": 4
            },
            "success": true
        }
        res.json(result);
    },
    "/v2/cashloan/submitDetailInfo": function(req, res) {

        var result = {
            "statusCode": 200,
            "message": "设置用户地址等信息成功",
            "data": {
                "annualEarning": null,
                "workInfo": {
                    "profession": "3",
                    "specificAddr": "上海",
                    "companyPhone": "66666666",
                    "companyType": 1,
                    "workAddr": {
                        "province": "广东",
                        "city": "广州",
                        "district": "越秀区"
                    },
                    "liveTime": "2017-1",
                    "liveAddr": null,
                    "gps": null,
                    "workName": "快乐达"
                },
                "cashId": "null",
                "residentInfo": {
                    "specificAddr": "上海",
                    "liveTime": "2010-1",
                    "liveAddr": {
                        "province": "北京",
                        "city": "北京",
                        "district": "东城区"
                    },
                    "childSchool": null
                },
                "merchantId": "18fd13cc9aa611e6afb66c92bf314c17",
                "lifeInfo": {
                    "household": 2,
                    "merriage": 2
                },
                "quota": 0,
                "cashApplyId": null,
                "householdAddress": null,
                "userId": "46673d60a1f0417bb4085f6ea421ec48",
                "productType": 4
            },
            "success": true
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
    "/v16/iou/credatLoan": function(req, res) {

        var result = {

            code: 0,
            data: {

                result: 'ok'
            },
            message: '提示信息'
        }

        res.json(result);
    },
    //订单列表
    "/v16/iou/getLoanAndRepaying": function(req, res) {

        var data = [{
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 12, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 5, //状态number
                termDate: '2017-12-9', //还款日期string,
                repayStatus: 1, //还款状态number(1, 未还款; 2已还款)
                termNum: 14,
                lendTime: '2017-12-9'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 1, //状态number
                termDate: '', //还款日期string
                repayStatus: 2, //还款状态 number
                termNum: 7,
                lendTime: '2017-12-9'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 4, //状态number
                termDate: '2017-12-9', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '2017-12-9'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 6, //状态number
                termDate: '2017-12-9', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '2017-12-9'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 6, //状态number
                termDate: '2017-12-9', //还款日期string
                repayStatus: 2,
                termNum: 14,
                lendTime: '2017-12-9'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 3, //状态number
                termDate: '2017-12-9', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '2017-12-9'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 6, //状态number
                termDate: '2017-12-9', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '2017-12-9'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 6, //状态number
                termDate: '2017-12-9', //还款日期string
                repayStatus: 2,
                termNum: 14,
                lendTime: '2017-12-9'
            },
        ]

        // data = [];

        var result = {

            code: 0,
            data: data,
            message: '提示信息'
        }

        res.json(result);
    },

    "/v16/product/configs_7": function(req, res) {

        var result = [{
            "interestRate": 0.00066000,
            "periodCountMax": 1,
            "periodCountMin": 1,
            "productId": 108,
            "quotaMax": 2000.00,
            "quotaMin": 2000.00,
            "status": 2,
            "statusReason": 0,
            "termNum": 0,
            "termNums": "7",
            "termUnit": 1,
            "title": "零用钱"
        }]

        res.json({

            code: 0,
            data: result,
            message: '提示信息'
        })
    },
    "/v16/product/configs_8": function(req, res) {

        var result = [{
            "interestRate": 0.00066000,
            "periodCountMax": 1,
            "periodCountMin": 1,
            "productId": 108,
            "quotaMax": 2500.00,
            "quotaMin": 1500.00,
            "status": 2,
            "statusReason": 0,
            "termNum": 0,
            "termNums": "7,14,21",
            "termUnit": 1,
            "title": "零用钱"
        }]

        res.json({

            code: 0,
            data: result,
            message: '提示信息'
        })
    },
    "/v16/product/configs_9": function(req, res) {

        var result = [{
            "interestRate": 0.00066000,
            "periodCountMax": 1,
            "periodCountMin": 1,
            "productId": 108,
            "quotaMax": 2500.00,
            "quotaMin": 1500.00,
            "status": 2,
            "statusReason": 0,
            "termNum": 0,
            "termNums": "7",
            "termUnit": 1,
            "title": "零用钱"
        }]

        res.json({

            code: 0,
            data: result,
            message: '提示信息'
        })
    },
    "/v16/product/configs_10": function(req, res) {

        var result = [{
            "interestRate": 0.00066000,
            "periodCountMax": 1,
            "periodCountMin": 1,
            "productId": 108,
            "quotaMax": 2000.00,
            "quotaMin": 2000.00,
            "status": 2,
            "statusReason": 0,
            "termNum": 0,
            "termNums": "7,14",
            "termUnit": 1,
            "title": "零用钱"
        }]

        res.json({

            code: 0,
            data: result,
            message: '提示信息'
        })
    },
}