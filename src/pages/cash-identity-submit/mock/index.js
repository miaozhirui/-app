module.exports = {

  
    //查询身份证证的相关图片
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

    //提交身份验证信息
    "/v2/cashloan/submitUserInfo": function(req, res) {

        var result = {
            "statusCode": 200,//7008 提交失败  //4000 参数错误，注册请从第一步开始
            "message": "upload success",
            "success": true,
            "data": {
                "userStatus":3,  //3 关闭微信浏览器 //2 merchantid 商户判断 //已验证
                "cashId": "",
                "name": "", //姓名
                "idNum": "", //身份证号
                "idAddress": "", //身份证地址
                "cardNum": "",//银行卡号
                "cashApplyId":null,
                "idNumValidDateEnd":null, 
                "isVerified":true, 
                "merchantId":"18fd13cc9aa611e6afb66c92bf314c17",
                "productType":4, 
                "userId":"46673d60a1f0417bb4085f6ea421ec48"
            }
        }

        res.json(result);
    },

    //提交身份图片
    "/v2/user/file/uploadByUserId": function(req, res) {

        var result = {
            "statusCode": 7007,//7008 提交失败  //4000 参数错误，注册请从第一步开始
            "message": "upload success",
            "success": true,
            "data": {
              userId: "46673d60a1f0417bb4085f6ea421ec48"
            }
        }

        res.json(result);
    }
}
