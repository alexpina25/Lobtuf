const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
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
    });

    await user.save();
    await sendVerificationEmail(user);

    res.status(201).json({
      message: "Registro exitoso, por favor verifica tu correo electrónico",
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .json({ message: `El ${field} ya está registrado` });
    }
    res.status(500).json({ message: "Error en el registro" });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (!user) {
      return res.status(400).json({ message: "Token inválido" });
    }

    user.isVerified = true;
    await user.save();

    // Generar un nuevo token JWT
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Redirigir al frontend con el token JWT
    res.redirect(`${process.env.CLIENT_URL}/profile?token=${authToken}`);
  } catch (error) {
    console.error("Error en la verificación de correo:", error);
    res.status(400).json({ message: "Token inválido o expirado" });
  }
};
