const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const crypto = require("crypto");
const sendVerificationEmail = require("../utils/sendVerificationEmail");

exports.register = async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    country,
    phone,
    positions,
    platforms,
  } = req.body;

  try {
    /* const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está registrado" });
    } */

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generar OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    const user = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      country,
      phone,
      positions,
      platforms,
      otp, // Almacenar el OTP
    });

    await user.save();
    await sendVerificationEmail(user.email, otp); // Enviar el OTP

    res.status(201).json({
      message: "Registro exitoso, por favor verifica tu correo electrónico",
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el registro" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email, otp });

    if (!user) {
      return res.status(400).json({ message: 'Código OTP inválido' });
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Correo verificado exitosamente', token: authToken });
  } catch (error) {
    console.error('Error en la verificación del OTP:', error);
    res.status(500).json({ message: 'Error en la verificación del OTP' });
  }
};


