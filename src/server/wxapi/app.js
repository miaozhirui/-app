var express = require('express');
var app = express();

app.use('/json', require('./routes/api.js'));

app.use(function (error, req, res, next) {

    res.status(500).send(error.stack);
})

app.listen(3003);