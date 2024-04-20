const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  name: { type: String, require: true },
  espe: { type: String, require: true },
});

const Doctor = mongoose.model('doctor', doctorSchema);
module.exports = Doctor;
