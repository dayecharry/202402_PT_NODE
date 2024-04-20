const mongoose = require('mongoose');
const Doctor = require('./src/api/models/doctor.model');

const doctors = [
  { name: 'ana', espe: ' alergologo' },
  { name: 'anderson', espe: 'traumatologo' },
  { name: 'Sofia', espe: 'general' },
  { name: 'joaquin', espe: 'exoticos' },
  { name: 'lucia', espe: 'rural' },
  { name: 'adrian', espe: ' traumatologo' },
];
const doctorsDocument = doctors.map((dr) => new Doctor(dr));

mongoose
  .connect(
    'mongodb+srv://dayana:STStosXtBAb06Cz5@cluster0.fci00lm.mongodb.net/upgrade?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(async () => {
    const doctorsDB = await Doctor.find();
    if (doctorsDB.length !== 0) {
      await Doctor.collection.drop();
    }
  })
  .catch((err) => console.log(err))
  .then(async () => {
    await Doctor.insertMany(doctorsDocument);
  })
  .catch((error) => console.log(error))
  .finally(() => mongoose.disconnect());
