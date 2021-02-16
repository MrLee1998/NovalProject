const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const readBookUrlSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  bookUrl: {
    type: Array,
    required: true
  },
}, { collection: 'readBookUrl', versionKey: false});

module.exports = mongoose.model('readBookUrl', readBookUrlSchema);
