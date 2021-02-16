const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const collectBookSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  bookInfo: {
    type: Array,
    required: true
  },
}, { collection: 'collectBook', versionKey: false});

module.exports = mongoose.model('collectBook', collectBookSchema);
