const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { validateEmailDB, validatePassword } = require('../../utils/validator');

const register = async (req, res) => {
  try {
    // creo el documento del usuario
    const userDoc = new User(req.body);
    console.log(req.body);
    //validaciones
    //1.- El usuario no exista. (email)
    const valEmail = await validateEmailDB(req.body.email);
    console.log(valEmail); // devuelve null si no se encuentra  en la BD
    if (!valEmail) {
      // valEmail === null
      //2.- La contraseña cumpla el patron requerido (regex)
      const valPassword = validatePassword(req.body.password);
      if (valPassword) {
        //3.- Encriptar la contraseña  antes de registrarme  HASH
        userDoc.password = bcrypt.hashSync(userDoc.password, 10);
        const createdUser = await userDoc.save();
        return res.status(200).json({ success: true, data: createdUser });
      } else {
        return res.status(200).json({
          success: false,
          message: 'La contraseña no cumple con el patron indicado',
        });
      }
    }
    return res
      .status(200)
      .json({ success: false, message: 'El email ya está registrado' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { register };
