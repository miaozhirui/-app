module.exports = {
    
    "/v16/iou/signingMessage": function(req, res) {
        
        console.log(req.body)
        var result = {
            code: 0,
            data: "",
            message: "提示信息"
        }

        res.json(result);
    }
}
