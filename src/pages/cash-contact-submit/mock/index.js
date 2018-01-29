module.exports = {

    //提交联系人的信息
    "/v2/cashloan/submitContactInfo": function(req, res) {

        var result = {
            "statusCode":200,
            "message":"提交联系人信息成功",
            "data":{
                "cashId":"null",
                "contactInfo":[
                  {
                  "relationType":"1",
                  "phone":"18801951984",
                  "name":"王一","rank":1
                  },
                  {
                  "relationType":"4",
                  "phone":"18801951983",
                  "name":"王二",
                  "rank":2
                  },
                  {
                  "relationType":"4",
                  "phone":"18801951989",
                  "name":"王三","rank":3
                  }
                ],
                "merchantId":"18fd13cc9aa611e6afb66c92bf314c17",
                "userId":"46673d60a1f0417bb4085f6ea421ec48",
                "productType":4
            },
            "success":true
            }
        res.json(result);
    }


}
