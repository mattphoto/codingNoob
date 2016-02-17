var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var resourceModel = new Schema({
  rating: { type: Number, min: 0, max: 100 },
  cost: {type: String},

  category: {type: String},
  title: {type: String},
  url: {type: String},
  author: {type: String},
  description: {type: String},

  difficulty: {type: String},
  type: {type: String},
  length: {type: String},
  date: {type: String},
  date_published: {type: String},
  created_at: Date,
  updated_at: Date

});

module.exports = mongoose.model('Resource', resourceModel);
