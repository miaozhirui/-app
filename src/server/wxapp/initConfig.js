var path = require('path');
var config = require('./config');
var util = require('./lib/util');
var fs = require('fs');
var accessTokenFile = path.resolve('./config/accessToken.json');

module.exports = function *(next) {

    var product = this.query.product || 0;

    var appIds = fs.readFileSync('./config/appIds.json','utf8');

    appIds = JSON.parse(appIds);

    try{

        var wxAppConfig = appIds[product];
        
        console.log(wxAppConfig,'-------');
        

        var appConfig = {
            appId: wxAppConfig.appId,
            appSecret: wxAppConfig.appSecret,
            token:"credan88",
            getAccessToken: function() {


                return util.readFileAsync(accessTokenFile, 'utf8', product);

            },

            saveAccessToken: function(data) {

                return util.writeFileAsync(accessTokenFile, data, product);

            }
        }

        this.appConfig = appConfig;

        yield next;
    }catch (e){


    }

}