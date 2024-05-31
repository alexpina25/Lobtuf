const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Cargar las variables de entorno

const sendVerificationEmail = async (user) => {
  // Configuración de Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const url = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: 'Verificación de correo electrónico',
    html: `Haz clic en el siguiente enlace para verificar tu correo: <a href="${url}">${url}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo de verificación enviado.');
  } catch (error) {
    console.error('Error enviando el correo de verificación:', error);
    throw new Error('Error enviando el correo de verificación');
  }
};

module.exports = sendVerificationEmail;
