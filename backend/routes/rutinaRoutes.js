const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { edad, peso, altura, objetivo, experiencia, genero, dias } = req.body;

  let rutina = [];

  if (dias <= 3) {
    rutina.push("Full Body Día 1", "Full Body Día 2", "Full Body Día 3");
  } else if (dias === 4) {
    rutina.push("Upper Día 1", "Lower Día 2", "Upper Día 3", "Lower Día 4");
  } else if (dias === 5) {
    rutina.push(
      "Push Día 1",
      "Pull Día 2",
      "Legs Día 3",
      "Push Día 4",
      "Pull Día 5"
    );
  }

  res.json({
    rutina,
    mensaje: `Rutina generada para ${dias} días con objetivo: ${objetivo}`,
  });
});

module.exports = router;
