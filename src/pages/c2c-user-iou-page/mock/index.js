module.exports = {
    
    //获取用户欠条信息
    "/v16/iou/userGetSigningMessage": function(req, res) {

        var data = {

            lendMoney: 1530,// 借款金额 number
            lendTime: "1513500446000", //借款时间 string
            loanId:1000,// number
            loanerIdNum: "32082619xxxxxxxxxx", //放款人身份证号 string
            loanerName:"张三", //放款人姓名 string
            repayTime: "1513500446000", //还款时间 string
            termNum:7,// 借款天数 number
            transferUse:'旅游', // 借款用途 string
            userIdNum:"3208261990xxxxxxxxx",// 借款人身份证号 string
            userName: "李四",// 借款人姓名
            payWay:"银行转账"  //支付方式    string
        }

        // res.json({

        //     code: 0,
        //     data: data,
        //     message: '提示信息'
        // })
        
        res.json({

            code: 403,
            data: "",
            message: '登陆验证失败' 
        })
    },
    
    //用户签字信息
    "/v16/iou/userSigningMessage": function(req, res) {

        res.json({

            code: 0,
            data: "",
            message: "提示信息"
        })
    }
}