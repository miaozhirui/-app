module.exports = {

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
    }

    
}
