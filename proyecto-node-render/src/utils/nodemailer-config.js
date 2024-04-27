const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email', //smtp.gmail.email
  port: 587,
  auth: {
    user: 'lucas64@ethereal.email', // usuario del email
    pass: 'uasneJf64QpUE3g3zK', // contraseña del email
  },
});

module.exports = transporter;
