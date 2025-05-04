// script.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  const API_URL = "http://localhost:3001/api/auth"; // Cambia si usás dominio/productivo

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("login-username").value.trim();
      const password = document.getElementById("login-password").value.trim();

      if (!username || !password) {
        alert("Please enter both username and password.");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(`Error: ${data.message}`);
        } else {
          alert(`Welcome, ${data.user.username}!`);
          // Redirigir a la página de rutinas, por ejemplo:
          window.location.href = "create-routine.html";
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Error connecting to server.");
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document
        .getElementById("register-username")
        .value.trim();
      const email = document.getElementById("register-email").value.trim();
      const password = document
        .getElementById("register-password")
        .value.trim();

      if (!username || !email || !password) {
        alert("Please complete all fields.");
        return;
      }

      try {
        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(`Error: ${data.message}`);
        } else {
          alert(`User ${data.user.username} registered! You can now log in.`);
          registerForm.reset();
        }
      } catch (err) {
        console.error("Register error:", err);
        alert("Error connecting to server.");
      }
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("retro-theme");
      document.body.classList.toggle("dark-theme");
    });
  }
});
