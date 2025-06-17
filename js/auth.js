// js/auth.js

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const messageDiv = document.getElementById('message');

    // Lógica para la página de login/home (index.html)
    if (window.location.pathname.split('/').pop() === 'index.html') {
        const loggedIn = localStorage.getItem('loggedIn');
        const loginSection = document.getElementById('login-section');
        const mainContent = document.getElementById('main-content');

        if (loggedIn === 'true') {
            // Si está logueado, ocultar login y mostrar contenido principal
            if (loginSection) loginSection.style.display = 'none';
            if (mainContent) mainContent.style.display = 'block';
        } else {
            // Si no está logueado, mostrar login y ocultar contenido principal
            if (loginSection) loginSection.style.display = 'block';
            if (mainContent) mainContent.style.display = 'none';
        }

        // Si el formulario de login existe en la página, adjuntar el listener
        if (loginForm) {
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
                        // Después de login exitoso, recargar la misma página para mostrar el contenido principal
                        window.location.reload(); 
                    }, 1000);
                } else {
                    showMessage('Usuario o contraseña incorrectos.', 'error');
                }
            });
        }
    } else {
        // Lógica para TODAS LAS OTRAS PÁGINAS (diaX.html, estiramientos.html, peso_nutricion.html)
        checkAuthAndRedirect();
    }


    function showMessage(msg, type) {
        if (messageDiv) {
            messageDiv.textContent = msg;
            messageDiv.className = `message ${type}`;
            messageDiv.style.display = 'block';
        }
    }
});

// Esta función ahora solo se ejecuta en páginas que NO son index.html
function checkAuthAndRedirect() {
    const loggedIn = localStorage.getItem('loggedIn');
    // Si no está logeado Y no es la página de login (index.html), redirige
    if (loggedIn !== 'true') {
        window.location.href = 'index.html';
    }
    // Si está logueado, no hace nada, permite que la página se cargue normalmente
}

// Función para cerrar sesión (puede ser llamada desde cualquier página)
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('currentUser');
    // Puedes limpiar otros datos de localStorage aquí si es necesario
    window.location.href = 'index.html'; // Siempre redirige al login
}
