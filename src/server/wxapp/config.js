var util = require('./lib/util');
var path = require('path');
var wecahtFile = path.join(__dirname, './config/wechat.txt');

module.exports = config = {

    wechat: {

        // appID:"wx2e6e0cee84b08e4c",
        // appsecret: '981e618a40602da6367f66b3b7b1c594',
        appID:"wx1779b0487343038c",
        appsecret:'6d84a74a2aef04c8c2caf86f728ca1cf',
        token: 'credan88',
        getAccessToken: function() {

            return util.readFileAsync(wecahtFile);
        },
        saveAccessToken: function(data) {

            return util.writeFileSync(wecahtFile, data);
        }
    }
}