const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
  profile: {
    data: Buffer,
    contentType: String,
  },
  portfolio: {
    data: Buffer,
    contentType: String,
  },
  banner: {
    data: Buffer,
    contentType: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Image', ImageSchema);
