const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    lastname: { type: String, require: true },
  },
  {
    collection: 'user',
  }
);
const User = mongoose.model('user', userSchema);
module.exports = User;
