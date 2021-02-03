const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const collectBookSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'collectBook', versionKey: false});

module.exports = mongoose.model('password', collectBookSchema);
