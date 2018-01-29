module.exports = {

      "/v2/user/collection/mobile/submit": function(req, res) {

        var result = {
            "statusCode": 1010,
            "message": "提交验证",
            "success": true
        }

        res.json(result);

      }
}
