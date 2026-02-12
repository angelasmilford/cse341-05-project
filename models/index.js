const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.islands = require('./islands.js')(mongoose);
db.traditions = require('./traditions.js')(mongoose);

module.exports = db;
