var Promise = require('bluebird');
var fs = require('fs');


exports.readFileAsync = readFileAsync;

function readFileAsync(path, encoding, product) {

    encoding = encoding || 'utf8';

    return new Promise(function(resolve, reject) {
        fs.readFile(path, encoding, function (err, data) {
            if(err){

                reject(err);
            } else {

                resolve(data[product])
            }
        })

    })
}


exports.writeFileAsync = function(path, content, product) {



    return new Promise(function (resolve, reject) {

        fs.readFile(path, 'utf8', function (err, data) {

            if(err){
                console.error(err);
                return;
            }

            data = JSON.parse(data);

            data[product] = content;

            data = JSON.stringify(data);

            fs.writeFile(path, data, function (err) {

                if(err) {

                    reject(err);
                } else {

                    resolve(content);
                }
            })
        })


    })
}