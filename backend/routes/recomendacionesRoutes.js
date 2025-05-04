const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    recomendaciones: [
      {
        grupos: "Pecho + Tríceps",
        ejercicios: ["Press banca", "Fondos", "Extensión de tríceps"],
        dias: "2 veces por semana",
      },
      {
        grupos: "Espalda + Bíceps",
        ejercicios: ["Remo con barra", "Pull-ups", "Curl bíceps"],
        dias: "2 veces por semana",
      },
      {
        grupos: "Piernas + Glúteos",
        ejercicios: ["Sentadillas", "Peso muerto", "Hip thrust"],
        dias: "1 o 2 veces por semana",
      },
    ],
  });
});

module.exports = router;
