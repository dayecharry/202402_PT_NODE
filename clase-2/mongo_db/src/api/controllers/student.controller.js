const Student = require('../models/student.model');

const add = async (req, res) => {
  try {
    //obtener los datos del front del estudiante
    const body = req.body;
    //crear el estudiante con la estructura dle modelo de datos
    const newStudent = new Student(body);
    //guardar los datos en la colección del la BD
    const createdStudent = await newStudent.save();
    // devolver una respuesta
    return res.json({
      success: true,
      student: createdStudent,
    });
  } catch (error) {}
};

module.exports = { add };
