'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  category: String,
  done: Boolean
});

module.exports = mongoose.model('Thing', ThingSchema);
