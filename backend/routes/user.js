const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Calcular edad del usuario
function calcularEdad(fechaNacimiento) {
  const today = new Date();
  const birthDate = new Date(fechaNacimiento);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// Ruta para obtener el perfil del usuario
router.get("/profile", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Acceso denegado");

  try {
    const decoded = jwt.verify(token, "secretKey");
    const user = await User.findById(decoded.id);
    const edad = calcularEdad(user.fecha_nacimiento);
    res.json({ ...user.toObject(), edad });
  } catch (error) {
    res.status(400).send("Token inválido");
  }
});

// Ruta para actualizar el peso del usuario
router.put("/update-weight", async (req, res) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Acceso denegado");

  try {
    const decoded = jwt.verify(token, "secretKey");
    const { newWeight } = req.body;

    const user = await User.findById(decoded.id);
    user.peso = newWeight;
    await user.save();
    res.send("Peso actualizado con éxito");
  } catch (error) {
    res.status(400).send("Token inválido");
  }
});

module.exports = router;
