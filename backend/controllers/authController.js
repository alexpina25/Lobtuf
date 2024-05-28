const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const registerUser = async (req, res) => {
  console.log(req.body);
  const {
    firstName,
    lastName,
    username,
    email,
    phoneNumber,
    country,
    position,
    password
  } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const verificationToken = crypto.randomBytes(20).toString('hex');

    const user = await User.create({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      country,
      position,
      password,
      verificationToken,
    });

    const verifyUrl = `http://localhost:3000/verify-account/${verificationToken}`;
    const message = `Usted ha creado una cuenta en Furbol App. Por favor haga click en el siguiente enlace para verificar su cuenta: \n\n ${verifyUrl}`;

    await sendEmail({
      email: user.email,
      subject: 'Verificación de Cuenta',
      message,
    });

    res.status(201).json({ message: 'Correo de verificación enviado' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

const verifyUser = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido o expirado' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: 'Cuenta verificada' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { registerUser, loginUser, verifyUser };
