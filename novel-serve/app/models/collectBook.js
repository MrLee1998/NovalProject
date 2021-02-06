const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const collectBookSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  bookname: {
    type: String,
    required: true
  }
}, { collection: 'collectBook', versionKey: false});

module.exports = mongoose.model('password', collectBookSchema);
