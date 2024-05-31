const nodemailer = require("nodemailer");
require("dotenv").config();

const sendVerificationEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verificación de correo electrónico",
    html: `Tu código de verificación es: <b>${otp}</b>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Correo de verificación enviado.");
  } catch (error) {
    console.error("Error enviando el correo de verificación:", error);
    throw new Error("Error enviando el correo de verificación");
  }
};

module.exports = sendVerificationEmail;
