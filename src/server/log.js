var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, '../')));


app.get('/error', function(req, res) {
    
    
    res.json({
        code: 0,
        message: '提示信息'
    })
})


var server = app.listen(3001, function() {

    console.log('app listen at http://localhost:3001');
})