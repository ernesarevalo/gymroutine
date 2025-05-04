const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/authRoutes");
const recomendacionesRoutes = require("./routes/recomendacionesRoutes");
const historialRoutes = require("./routes/historialRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/recomendaciones", recomendacionesRoutes);
app.use("/api/historial", historialRoutes);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simulación de base de datos (en memoria)
const users = [
  {
    username: "ernes",
    password: bcrypt.hashSync("ernesadmin", 10),
    email: "ernestoarevalo@gmail.com",
    nombre: "Ernesto",
    apellido: "Arevalo",
  },
];

// Ruta de prueba
app.get("/", (req, res) => {
  res.send(
    "Servidor backend para rutinas estilo King of Fighters funcionando 🥋"
  );
});

// Ruta login simple
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ error: "Contraseña incorrecta" });

  res.json({ message: "Login correcto", user });
});

// Ruta de recuperación de contraseña (simulada con log)
app.post("/api/recuperar", async (req, res) => {
  const { email } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ error: "Email no registrado" });

  // Simulación de envío de email (no real)
  console.log(`📧 Se enviaría un mail de recuperación a: ${email}`);
  res.json({
    message: "Si el email existe, se envió un enlace de recuperación",
  });
});

// Agregá más rutas para rutinas, recomendaciones, etc.

// Start
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
