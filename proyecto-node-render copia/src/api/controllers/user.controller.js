const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { validateEmailDB, validatePassword } = require('../../utils/validator');
const { generateToken } = require('../../utils/jwt');
const { transporter } = require('../../utils/nodemailer-config');

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

        const createdUser = await userNew.save();

        const generateID = () => {
          const random = Math.random().toString(32).substring(2);
          const fecha = Date.now().toString(32);
          return random + fecha;
        };

        userNew.tokenId = generateID();
        await transporter.sendMail(
          {
            from: 'dayana.romero88@gmail.com', //sender addres
            to: 'dayana.romero88@gmail.com', //`${req.body.email}`, // list of receivers
            subject: 'Enviado desde nodemailer ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: `<b>Bienvenido a la aplicacion! ${req.body.name}, solo te queda un paso por realizar, pincha en el siguiente enláce para completar tu registro: <a href="http://localhost:5005/auth/confirm-user/${userNew.token}">Confirmar usuario<a> </b>`, // html body
          },
          function (error, info) {
            if (error) {
              console.error('Error al enviar el correo:', error);
              res.send('Error al enviar el correo');
            } else {
              console.log('Correo enviado:', info.response);
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

const confirm = async (req, res, next) => {
  const { token } = req.params;
  console.log(token);
  const userConfirm = await User.findOne({ token });
  if (!userConfirm) {
    const error = new Error('Token no valido');
    return res.status(403).json({ msg: error.message });
  }

  try {
    userConfirm.confirmed = true;
    userConfirm.token = '';
    await userConfirm.save();
    return res.status(200).json({ msg: '¡Usuario Confirmado!' });
  } catch (error) {
    return res.status(404).json({ msg: err.message });
  }
};

module.exports = { register, login, modifyProfile, getUsers, confirm };
