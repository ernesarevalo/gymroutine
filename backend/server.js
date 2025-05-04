const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Conexión a la base de datos
mongoose
  .connect("mongodb://localhost/rutinas-gym", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.log("Error al conectar a MongoDB", err);
  });

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
