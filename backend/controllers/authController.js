// Simulación de usuarios en memoria
const users = [];

function login(req, res) {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res
    .status(200)
    .json({ message: "Login successful", user: { username } });
}

function register(req, res) {
  const { username, email, password } = req.body;

  if (users.find((u) => u.username === username)) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const newUser = { username, email, password };
  users.push(newUser);

  return res
    .status(201)
    .json({
      message: "User registered successfully",
      user: { username, email },
    });
}

module.exports = { login, register };
