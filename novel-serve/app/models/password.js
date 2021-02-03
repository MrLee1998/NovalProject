const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PasswordSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { collection: 'password', versionKey: false});

module.exports = mongoose.model('password', PasswordSchema);
