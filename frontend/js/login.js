// frontend/js/login.js
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "ernes" && password === "ernes") {
      alert("Bienvenido, " + username);
      window.location.href = "/";
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  });
