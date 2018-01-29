var sha1 = require('sha1');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.use(bodyParser.json({type: 'application/json'}));

app.use('/wxapp', function(req, res) {

    var signature = req.query.signature;
    var echostr = req.query.echostr;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var token = "credan88";

    var str = [nonce, timestamp, token].sort().join('');
    var sha = sha1(str);

    // console.log(req)
    if(req.method == 'GET') {

        if(sha == signature){

            res.send(echostr);
            return;
        }
    } else if(req.method == 'POST'){

        console.log(req.body);
        res.json({
            "touser":"OPENID",
                "msgtype":"text",
                "text":
            {
                "content":"Hello World"
            }
         });
        return;
    }

})

app.listen(3002);