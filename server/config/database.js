// Database
var mongoose = require('mongoose');
require('../modal')(mongoose);
mongoose.connect('mongodb://localhost/node-mongoose');
exports.mongoose = mongoose;