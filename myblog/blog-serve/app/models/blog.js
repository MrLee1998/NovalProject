const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const BlogSchema = new Schema({
  content: {
    type: String
  },
  title: {
    type: String
  },
  time: {
    type: String
  },
  tag: {
    type: String
  }
  
}, { collection: 'blog', versionKey: false});

module.exports = mongoose.model('blog', BlogSchema);
