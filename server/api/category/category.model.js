'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CategorySchema = new Schema({
  cat: String,
});

module.exports = mongoose.model('Category', CategorySchema);
