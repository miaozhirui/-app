var express = require('express');
var app = express();
var routers = require('./routers');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type: 'application/json'}));

app.use('*', function(req, res, next){

    res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next()
})

routers(app);

app.use(function(err, req, res, next) {

    console.log(err.stack);

    res.status(500).send(err.stack);
})

app.listen(3000);
