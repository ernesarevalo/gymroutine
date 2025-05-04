const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

let usuarios = [
  { username: "ernes", password: bcrypt.hashSync("ernesadmin", 10) },
];

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const existe = usuarios.find((u) => u.username === username);

  if (existe) return res.status(400).json({ mensaje: "Usuario ya existe" });

  const hashedPassword = await bcrypt.hash(password, 10);
  usuarios.push({ username, password: hashedPassword });

  res.json({ mensaje: "Cuenta creada" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const usuario = usuarios.find((u) => u.username === username);

  if (!usuario)
    return res.status(400).json({ mensaje: "Usuario no encontrado" });

  const valid = await bcrypt.compare(password, usuario.password);

  if (!valid) return res.status(400).json({ mensaje: "Contraseña incorrecta" });

  res.json({ mensaje: "Login exitoso" });
});

module.exports = router;
