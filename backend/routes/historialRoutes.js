const express = require("express");
const router = express.Router();

let historial = [];

router.post("/guardar", (req, res) => {
  const { username, rutina } = req.body;
  historial.push({ username, rutina, fecha: new Date() });
  res.json({ mensaje: "Rutina guardada" });
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  const rutinasUsuario = historial.filter((r) => r.username === username);
  res.json({ rutinas: rutinasUsuario });
});

module.exports = router;
