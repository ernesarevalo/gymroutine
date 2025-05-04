const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Ruta para crear un usuario predeterminado
router.get("/create-default-user", async (req, res) => {
  const existingUser = await User.findOne({ username: "erns" });
  if (existingUser) {
    return res.send("Usuario ya existe.");
  }

  const hashedPassword = await bcrypt.hash("erns", 10);
  const user = new User({
    username: "erns",
    email: "ernestoarevalo@gmail.com",
    password: hashedPassword,
    fecha_nacimiento: new Date(1986, 8, 21), // 21 de septiembre de 1986
    sexo: "masculino",
    altura: 171,
    peso: 112,
  });

  await user.save();
  res.send("Usuario predeterminado creado.");
});

// Ruta de login (autenticación)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(400).send("Usuario no encontrado");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).send("Contraseña incorrecta");
  }

  const token = jwt.sign({ id: user._id }, "secretKey", { expiresIn: "1h" });
  res.json({ token });
});

module.exports = router;
