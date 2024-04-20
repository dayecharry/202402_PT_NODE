const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    lastname: { type: String, require: true },
    pet: [{ type: Schema.ObjectId, ref: 'pet' }], // ref: 'pet' hace referencia a la colección
    doctor: { type: Schema.ObjectId, ref: 'doctor' }, //se relaciona con la coleccion doctor
  },
  {
    collection: 'user',
  }
);
const User = mongoose.model('user', userSchema);
module.exports = User;
