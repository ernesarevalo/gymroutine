// backend/server.js
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 10000;

// Middleware para servir archivos estáticos desde frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Ruta de inicio
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Ruta de login
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "login.html"));
});

// Ruta de crear rutina
app.get("/createRoutine", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "createRoutine.html"));
});

// Iniciar el servidor
const PORT = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});
