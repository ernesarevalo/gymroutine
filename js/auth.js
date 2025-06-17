// js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');

    if (loginForm) { // Asegurarse de que estamos en la página de login
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada

            const username = usernameInput.value;
            const password = passwordInput.value;

            // Limitar el campo de usuario a solo números
            if (!/^\d+$/.test(username)) {
                showMessage('El usuario debe contener solo números.', 'error');
                return;
            }

            // Usuarios predefinidos
            const users = {
                '0000': 'AdminUser6454',
                '33118884': 'ernesto!1'
            };

            if (users[username] && users[username] === password) {
                // Autenticación exitosa
                localStorage.setItem('loggedIn', 'true'); // Marca al usuario como logeado
                localStorage.setItem('currentUser', username); // Guarda el usuario logeado
                showMessage('Inicio de sesión exitoso. Redirigiendo...', 'success');
                setTimeout(() => {
                    window.location.href = 'home.html'; // Redirige a la página principal
                }, 1000);
            } else {
                showMessage('Usuario o contraseña incorrectos.', 'error');
            }
        });
    }

    function showMessage(msg, type) {
        messageDiv.textContent = msg;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
    }
});

// Función para verificar si el usuario está logeado (para usar en otras páginas)
function checkAuth() {
    const loggedIn = localStorage.getItem('loggedIn');
    if (loggedIn !== 'true') {
        window.location.href = 'index.html'; // Redirige al login si no está logeado
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html'; // Redirige al login
}
