var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

var connection = mysql.createConnection({

    host: '60.205.231.190',
    user: 'root',
    password: 'Credan!888',
    database: 'logs'
})

connection.connect();


app.use(bodyParser.json({ type: 'application/json' }));

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next()
})

app.use(function(req, res, next) {
    
    req.connection = connection;
    next();
})
app.use('/api', require('./routes/api'));

app.all('/log', function(req, res) {

    var body = JSON.stringify(req.body);
    var keyInfo = Object.keys(req.body);

    if (!req.body.userAgent) {

        res.json({

            code: 0,
            data: '',
            message: '没用body'
        })

    } else {

        var logs = {

            log: body
        }

        var sql = connection.query('INSERT INTO logs set ?', logs, function(error, results, fields) {

            if (error) throw error;

            res.json({

                code: 0,
                data: '',
                message: '提示信息'
            })
        })
    }

})

app.use(function(err, req, res, next) {

    res.status(500).send(err.stack);
})
app.listen(3001);