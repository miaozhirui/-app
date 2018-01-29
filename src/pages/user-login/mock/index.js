module.exports = {
    
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
    "/v16/firm/whiteList": function(req, res) {

        var result = {
            code:0,
            data:true,
            message:"提示信息"
        }
        
        res.json(result)
    }
}
