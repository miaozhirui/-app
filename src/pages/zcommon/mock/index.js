var Geetest = require('gt3-sdk');

var captcha = new Geetest({
    geetest_id: "38d66226567502a5b0c63c92b22c2326",
    geetest_key: "b37ebc2363232114773e1e99395c52f2"
});

module.exports = {

    //获取贷款信息的接口
    "/v16/get/loanInfo": function(req, res) {

        var result = {
            "code": 0,
            "data": {
                "activityFee": 0,
                "dataFee": 18.7600,
                "dataFeeRate": 0.00134000,
                "interest": 9.2400,
                "interestRate": 0.00066000,
                "manageFee": 0.0000,
                "openAccountFee": 28.0000,
                "payFee": 14.0000,
                "payFeeRate": 0.00100000,
                "payMoney": 860.0000,
                "periodCount": 1,
                "serviceFee": 70.0000,
                "serviceFeeRate": 0.00500000,
                "singleRepayMoney": 1000,
                "termNum": 14,
                "loanMoney": 600,
                "cardName": "招商银行",
                "cardNo": "3356"
            },
            "status": 0,
            "success": true
        }

        res.json(result);
    },

    //用户提现接口
    "/wx/v16/cashLoanPay": function(req, res) {

        var result = {
            "statusCode": "5001", //如果是5001表示提现成功
            "message": "成功",
            "data": {
                "accountId": 897844,
                "activityFee": 0,
                "auditTime": 1509681500000,
                "calculateChain": "p101",
                "channelId": 0,
                "compatibleAuditStatus": "UNDER_WAY",
                "compatibleNextTerm": 0,
                "compatibleOverdueDay": 0,
                "compatibleSid": "2d50565d-8e84-4641-944b-b4c0f5cb31c5",
                "compatibleVersion": 0,
                "dataFee": 18.76,
                "firmId": 102,
                "fundPayAccountId": 10006,
                "fundRepayAccountId": 0,
                "id": 1846784,
                "interest": 9.24,
                "lastUpdated": 1509681501615,
                "lendMoney": 1000,
                "lendTime": 1509681500000,
                "manageFee": 0,
                "merchantId": 0,
                "openFee": 28,
                "payFee": 14,
                "payMoney": 0.15,
                "payToAccount": "6214830116369397",
                "payToLinkedPhone": "13913169273",
                "payToType": 1,
                "periodCount": 1,
                "periodRepayMoney": 1000,
                "productId": 101,
                "repaidMoney": 0,
                "repaidPeriodCount": 0,
                "repayMoney": 1000,
                "repayStatus": 1,
                "serviceFee": 70,
                "status": 5,
                "statusReason": 0,
                "termNum": 14,
                "termUnit": 1,
                "userSid": "d9a6e129762142bcab29e4ec1aade185"
            },
            "otherMsg": null,
            "success": true
        }

        res.json(result)
    },

    "/wx/v16/cashLoanPay": function(req, res) {

        var result = {
            "statusCode": "5001",
            "message": "成功",
            "data": "",
            "otherMsg": null,
            "success": true
        }

        res.json(result);
    },

    "/wx/smsCaptcha": function(req, res) {

        captcha.register(null, function(err, data) {
            if (err) {
                console.error(err);
                return;
            }
            if (!data.success) {
                res.send(data);
            } else {
                res.send(data);
            }
        })
    },

    "/wx/enrollSendCode": function(req, res) {
        console.log(22)
        var response = {
            statusCode: 10001,
            message: '发送成功！'
        }
        res.send(response);
    },

    "/v16/product/configs": function(req, res) {

        let productId = req.body[0];

        if (productId == 7) {//钱和时间都不能变

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
        } else if( productId == 8) {//钱和时间都可以变

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
        } else if( productId == 9) {//钱可以变，但时间不变

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
        } else if( productId == 10){//钱不可以变，但时间可以变
    
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
        } else {

            var result = {
                "code": 0,
                "data": [{
                        "interestRate": 0.00066000,
                        "termNums": "14",
                        "statusReason": 0,
                        "productId": 107,
                        "periodCountMax": 1,
                        "periodCountMin": 1,
                        "quotaMax": 1000.00,
                        "title": "拿点花",
                        "quotaMin": 1000.00,
                        "termUnit": 1,
                        "status": 2,
                        "termNum": 0
                    },
                    {
                        "interestRate": 0.00066000,
                        "termNums": "14",
                        "statusReason": 0,
                        "productId": 111,
                        "periodCountMax": 1,
                        "periodCountMin": 1,
                        "quotaMax": 1000.00,
                        "title": "速融超",
                        "quotaMin": 1000.00,
                        "termUnit": 1,
                        "status": 1,
                        "termNum": 0
                    },
                    {
                        "interestRate": 0.00066000,
                        "termNums": "14",
                        "statusReason": 0,
                        "productId": 103,
                        "periodCountMax": 1,
                        "periodCountMin": 1,
                        "quotaMax": 1000.00,
                        "title": "仟元贷",
                        "quotaMin": 1000.00,
                        "termUnit": 1,
                        "status": 2,
                        "termNum": 0
                    },
                    {
                        "interestRate": 0.00066000,
                        "termNums": "14",
                        "statusReason": 0,
                        "productId": 108,
                        "periodCountMax": 1,
                        "periodCountMin": 1,
                        "quotaMax": 1000.00,
                        "title": "付呗零用钱",
                        "quotaMin": 1000.00,
                        "termUnit": 1,
                        "status": 1,
                        "termNum": 0
                    },
                    {
                        "interestRate": 0.00066000,
                        "termNums": "14",
                        "statusReason": 0,
                        "productId": 101,
                        "periodCountMax": 1,
                        "periodCountMin": 1,
                        "quotaMax": 1000.00,
                        "title": "魔贷",
                        "quotaMin": 1000.00,
                        "termUnit": 1,
                        "status": 1,
                        "termNum": 0
                    },
                    {
                        "interestRate": 0.00066000,
                        "termNums": "14",
                        "statusReason": 0,
                        "productId": 104,
                        "periodCountMax": 1,
                        "periodCountMin": 1,
                        "quotaMax": 1000.00,
                        "title": "爱多贷",
                        "quotaMin": 1000.00,
                        "termUnit": 1,
                        "status": 1,
                        "termNum": 0
                    }
                ],
                "status": 0,
                "success": true
            }
        }

        res.json({

            code: 0,
            data: result,
            message: '提示信息'
        })
    }
}