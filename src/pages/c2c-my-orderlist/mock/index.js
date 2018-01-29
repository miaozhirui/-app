module.exports = {

    //订单列表
    "/v16/iou/getLoanAndRepaying": function(req, res) {

        var data = [{
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 6, //状态number
                termDate: '', //还款日期string
                repayStatus: 1, //还款状态 number
                termNum: 7,
                lendTime: '1513500446000',
                loanId: 2,
                signatureUrl: "http://credan-eqb.oss-cn-hangzhou.aliyuncs.com/04756a26dd9a4700b60f5e351843363f.pdf",
                fundRepayAccountId: '504',
                planId: '123'
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 2, //状态number
                termDate: '', //还款日期string
                repayStatus: 2, //还款状态 number
                termNum: 7,
                lendTime: '1513500446000',
                loanId: 2,
                signatureUrl: "http://credan-eqb.oss-cn-hangzhou.aliyuncs.com/04756a26dd9a4700b60f5e351843363f.pdf"
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 3, //状态number
                termDate: '1513500446000', //还款日期string,
                repayStatus: 1, //还款状态number(1, 未还款; 2已还款)
                termNum: 14,
                lendTime: '1513500446000', //申请日期
                arriveTime: '1515427200000', //借款日期
                loanId: 1,
                signatureUrl: "http://credan-eqb.oss-cn-hangzhou.aliyuncs.com/6272b2adda5043109f58653f595cc99a.png"
                // signatureUrl: "http://credan-eqb.oss-cn-hangzhou.aliyuncs.com/04756a26dd9a4700b60f5e351843363f.pdf"
            },

            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 4, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 3,
                signatureUrl: "http://localhost:8080/static/source/signature.pdf"
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 5, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 4,
                signatureUrl: "http://localhost:8080/static/source/signature.pdf"
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 6, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 2,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 5,
                signatureUrl: "http://localhost:8080/static/source/signature.pdf"
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 12, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 6,
                signatureUrl: ""
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 6, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 1,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 7,
                signatureUrl: ""
            },
            {
                interest: 56, //利息number
                lendMoney: 1000, //借款金额//number
                name: '张三', //放款人姓名string
                overdueDays: 0, //逾期天数  number
                overdueFee: 102, //逾期费number
                repayMoney: 120, //应还款金额number
                status: 16, //状态number
                termDate: '1513500446000', //还款日期string
                repayStatus: 2,
                termNum: 14,
                lendTime: '1513500446000',
                loanId: 8,
                signatureUrl: ""
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
    "/wx/v16/LLPayInterface": function(req, res) {

        var result = {
            "statusCode": 5004,
            "message": "连连支付返回参数成功",
            "success": true,
            "data": {
                "acct_name": "缪志瑞",
                "app_request": "3",
                "bg_color": "36b046",
                "busi_partner": "101001",
                "dt_order": "20171103115917",
                "id_no": "320826199009133356",
                "info_order": "还款",
                "money_order": "50.01",
                "name_goods": "还款",
                "no_agree": "",
                "no_order": "369445",
                "notify_url": "http://118.190.60.163:8030/wx/LLNotifyUrl ",
                "oid_partner": "201709080000890470",
                "risk_item": {
                    "user_info_full_name": "缪志瑞",
                    "user_info_id_no": "320826199009133356",
                    "user_info_identify_type": "2",
                    "user_info_bind_phone": "13913169273",
                    "user_info_identify_state": "1",
                    "user_info_mercht_userno": "d9a6e129762142bcab29e4ec1aade185",
                    "frms_ware_category": "2010",
                    "user_info_dt_register": "20170803161349"
                },
                "sign": "QCBhR29l1mNryf/JO3QrIuniVs+hBIfZqVuP70pHikpajpRfwpVsr8Lds63jA9T9thrUDzEr8A+ymEharVh5bLg+xlwB6PjVXlQFpXesZzLnpWwFxlET/he4qoQ7kfzIXOie/cpBaty3a9m7C9WPpcNUOuN3FhsEAL6K3L9ue8c=",
                "sign_type": "RSA",
                "url_return": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa3ffa0ee90690f42&redirect_uri=http://app.credan.com/cs/account/&response_type=code&scope=snsapi_userinfo",
                "user_id": "d9a6e129762142bcab29e4ec1aade185",
                "valid_order": "30"
            }
        }

        res.json(result);
    }
}