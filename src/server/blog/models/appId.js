var mongoose = require('mongoose');
var appId = require('../schemas/appId');

module.exports = mongoose.model('appId', appId);