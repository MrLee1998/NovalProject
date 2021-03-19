const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const footSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  bookInfo: {
    type: Array,
    required: true
  },
}, { collection: 'foot', versionKey: false});

module.exports = mongoose.model('foot', footSchema);
