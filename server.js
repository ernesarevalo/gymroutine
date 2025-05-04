const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Servir frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// Ruta base
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Ruta ejemplo para rutinas (extendible)
app.post("/api/save-routine", (req, res) => {
  const data = req.body;
  console.log("Rutina recibida:", data);
  res.status(200).json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
