const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'darrell.erdman1@ethereal.email',
    pass: 'zYEBnV5JP2F7fN5jUJ',
  },
});

module.exports = {
  transporter,
};
