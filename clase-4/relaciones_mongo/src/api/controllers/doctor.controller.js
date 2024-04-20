const Doctor = require('../models/doctor.model');

const addDoctor = async (req, res) => {
  try {
    console.log(req.body);
    const newDoctor = new Doctor(req.body);
    const createdDoctor = await newDoctor.save();
    return res.json(createdDoctor);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { addDoctor };
