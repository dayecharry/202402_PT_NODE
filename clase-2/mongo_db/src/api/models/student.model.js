//--> json (string, number, boolean, array, ObjectId, date)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const studentSchema = new Schema(
  {
    name: { type: String, require: true },
    lastName: { type: String, require: true },
    age: { type: Number },
  },
  {
    collection: 'students',
  }
);
// model(Nombre de la coleccion, nombre del esquema);
const Student = mongoose.model('students', studentSchema);
module.exports = Student;
