const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.task = require("./task.model");
db.attachment = require("./attachment.model");




module.exports = db;
