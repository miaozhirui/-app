var mongoose = require('mongoose');
var category = require('../schemas/categories');

module.exports = mongoose.model('category', category);