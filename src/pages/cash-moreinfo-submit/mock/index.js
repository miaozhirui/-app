module.exports = {

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
  }

}
