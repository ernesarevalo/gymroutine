const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, "../frontend")));

// Para pruebas, una ruta básica
app.get("/api/ping", (req, res) => {
  res.send("pong");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
