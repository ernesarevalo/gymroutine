// js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');

    // Solo ejecutar la lógica de login si estamos en la página del formulario de login
    if (loginForm) {
        // Redirigir a index.html (ahora la Home) si ya está logueado
        if (localStorage.getItem('loggedIn') === 'true') {
            window.location.href = 'index.html'; // Redirige a la página principal (que ahora es index.html)
            return; // Detiene la ejecución
        }

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = usernameInput.value;
            const password = passwordInput.value;

            if (!/^\d+$/.test(username)) {
                showMessage('El usuario debe contener solo números.', 'error');
                return;
            }

            const users = {
                '0000': 'AdminUser6454',
                '33118884': 'ernesto!1'
            };

            if (users[username] && users[username] === password) {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('currentUser', username);
                showMessage('Inicio de sesión exitoso. Redirigiendo...', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html'; // Redirige a la página principal (index.html)
                }, 1000);
            } else {
                showMessage('Usuario o contraseña incorrectos.', 'error');
            }
        });
    }

    function showMessage(msg, type) {
        if (messageDiv) {
            messageDiv.textContent = msg;
            messageDiv.className = `message ${type}`;
            messageDiv.style.display = 'block';
        }
    }
});

// Función para verificar si el usuario está logeado (para usar en TODAS las páginas que requieren login)
function checkAuthAndRedirect() {
    const loggedIn = localStorage.getItem('loggedIn');
    // Si no está logeado Y no es la página de login (index.html)
    if (loggedIn !== 'true' && window.location.pathname.split('/').pop() !== 'index.html') {
        window.location.href = 'index.html'; // Redirige al login
    } else if (loggedIn === 'true' && window.location.pathname.split('/').pop() === 'index.html' && document.getElementById('loginForm')) {
        // Si ya está logeado y está en la página de login, lo redirige a la home (que ahora es index.html principal)
        // Esto previene que se quede atascado en el formulario de login si recarga la página
        // Solo lo redirige si el formulario de login es visible, para no interferir con la vista principal de index.html
        window.location.href = 'index.html'; 
    }
}

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    // Limpiar localStorage específico de la app si es necesario, ej. localStorage.removeItem('weightHistory');
    window.location.href = 'index.html'; // Redirige al login (que ahora es index.html)
}
