var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var resourceModel = new Schema({
  title: {type: String},
  url: {type: String},
  category: {type: String},
  description: {type: String},
  // read: {type: Boolean, default: false},
  date: {type: String}
});

module.exports = mongoose.model('Resource', resourceModel);
 
