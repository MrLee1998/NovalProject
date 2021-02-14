const mongoose = require('mongoose');


const Schema = mongoose.Schema;
const collectBookSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
}, { collection: 'collectBook', versionKey: false});

module.exports = mongoose.model('collectBook', collectBookSchema);
