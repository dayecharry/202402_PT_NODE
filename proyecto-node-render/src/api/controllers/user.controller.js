const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { validateEmailDB, validatePassword } = require('../../utils/validator');
const { generateToken } = require('../../utils/jwt');
const generateRandomNumber = require('../../utils/gerenateRandomNumber');
const transporter = require('../../utils/nodemailer-config');

const register = async (req, res) => {
  try {
    // creo el documento del usuario
    const userNew = new User(req.body);
    console.log(req.body);
    // si recibo de cloudinary la ruta de la imagen  se la asigno a la propiedad image de nuevo documento
    /* if (req.file.path) {
       userNew.image = req.file.path;
     }*/
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
        userNew.password = bcrypt.hashSync(userNew.password, 10);
        userNew.confirmUser = generateRandomNumber(); //false;
        const createdUser = await userNew.save();

        await transporter.sendMail(
          {
            from: 'lucas64@ethereal.email',
            to: req.body.email,
            subject: 'Enviado desde nodemailer',
            text: 'hola mundo',
            html: `
          <h4> Bienvenido ${req.body.name} </h4>
          <p>Haga click en el siguiente enlace para confirmar su cuenta  <a href="http://localhost:5005/user/confirm-user/${userNew.confirmUser}"> HAGA CLICK </a> </p>
          `,
          },
          function (error, info) {
            if (error) {
              console.log(error);
              res.send('error al enviar el email');
            } else {
              console.log('correo enviado: ' + info.response);
              res.send('Correo enviado correctamente');
            }
          }
        );

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

const login = async (req, res) => {
  try {
    const userBody = req.body;
    const userDB = await validateEmailDB(userBody.email);
    if (!userDB) {
      return res
        .status(200)
        .json({ succe: false, message: 'El email no está registrado' });
    }
    if (!bcrypt.compareSync(userBody.password, userDB.password)) {
      return res
        .status(200)
        .json({ succes: true, message: 'contraseña invalida' });
    }
    //generar el token
    const token = generateToken({
      name: userDB.name,
      email: userDB.email,
      _id: userDB._id,
    });
    return res.status(200).json({ success: true, token: token });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const modifyProfile = async (req, res) => {
  console.log('funcion de modificar');
  console.log(req.userProfile); // es el usuario con los datos correspondiente al token
  const newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  newUser._id = req.userProfile._id;
  console.log(newUser);
  const updateUser = await User.findByIdAndUpdate(
    req.userProfile._id,
    newUser,
    { new: true }
  );
  return res.status(200).json({ data: updateUser });
};
const getUsers = async (req, res) => {
  try {
    const usersDB = await User.find();
    return res.json(usersDB);
  } catch (error) {
    console.log(error);
  }
};

const confirm = async (req, res) => {
  console.log('se ha confirmado el usuario');
  // dato de confirmacion, de usuario, confirmUser es la variable definida en el router, que corresponde al string unico guardado en la BD
  const { confirmUser } = req.params;
  const userDB = await User.findOne({ confirmUser });
  try {
    if (!userDB) {
      return res.status(403).json({ message: 'Codigo incorrecto' });
    }
    //cambiar el estatus del usuario para saber que está confirmado
    userDB.confirmUser = '';
    await userDB.save();
    return res.status(200).json({ message: 'Usuario confirmado' });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { register, login, modifyProfile, getUsers, confirm };
