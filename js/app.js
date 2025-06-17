// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // Asegurarse de que el usuario está autenticado en todas las páginas que usan app.js
    checkAuthAndRedirect();

    // --- Lógica del Selector de Tema ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            body.className = savedTheme;
        } else {
            // Tema oscuro por defecto si no hay preferencia guardada
            body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
        }
        updateThemeButtonText();
    }

    function toggleTheme() {
        if (body.classList.contains('dark-theme')) {
            body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
        }
        updateThemeButtonText();
    }

    function updateThemeButtonText() {
        if (themeToggleBtn) {
            if (body.classList.contains('dark-theme')) {
                themeToggleBtn.textContent = 'Tema Claro';
            } else {
                themeToggleBtn.textContent = 'Tema Oscuro';
            }
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    loadTheme(); // Cargar el tema al inicio de la página


    // --- Lógica de Temporizador (integrada en el NAV) ---
    const timerDisplay = document.getElementById('timer-display');
    const exerciseTimeInput = document.getElementById('exercise-time');
    const recoveryTimeInput = document.getElementById('recovery-time');
    const roundsInput = document.getElementById('rounds');
    const startTimerBtn = document.getElementById('start-timer-btn');
    const resetTimerBtn = document.getElementById('reset-timer-btn');

    let currentTimerInterval; // Para almacenar el setInterval
    let timeLeftInPhase;
    let currentPhase = 'pre-start'; // 'pre-start', 'exercise', 'recovery'
    let currentRound = 1;
    let preTimerCount = 3;
    let timerState = 'stopped'; // 'stopped', 'pre-countdown', 'running'

    // Alarmas (ajusta las rutas a tus archivos de audio)
    // Crea una carpeta 'audio' dentro de 'img/' y coloca los archivos .mp3 o .wav
    const startAlarm = new Audio('img/audio/start_alarm.mp3');
    const midAlarm = new Audio('img/audio/mid_alarm.mp3');
    const tenSecAlarm = new Audio('img/audio/ten_sec_alarm.mp3');
    const recoveryTenSecAlarm = new Audio('img/audio/recovery_ten_sec_alarm.mp3');
    const endAlarm = new Audio('img/audio/end_alarm.mp3'); // Para el final completo

    startAlarm.volume = 0.7; midAlarm.volume = 0.5; tenSecAlarm.volume = 0.8;
    recoveryTenSecAlarm.volume = 0.8; endAlarm.volume = 0.9;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function updateTimerUI() {
        if (timerDisplay) {
            timerDisplay.textContent = formatTime(timeLeftInPhase);
            if (currentPhase === 'exercise') {
                timerDisplay.style.color = 'var(--header-color-dark)'; // Color para ejercicio (azul)
            } else if (currentPhase === 'recovery') {
                timerDisplay.style.color = 'var(--accent-color-dark)'; // Color para recuperación (verde)
            } else {
                timerDisplay.style.color = 'var(--text-color-dark)'; // Color neutro para pre-start/stop
            }
        }
        if (startTimerBtn) startTimerBtn.disabled = (timerState === 'running' || timerState === 'pre-countdown');
        if (resetTimerBtn) resetTimerBtn.disabled = (timerState === 'stopped');
    }

    function playAlarm(alarm) {
        if (alarm && alarm.play) {
            alarm.currentTime = 0;
            alarm.play().catch(e => console.error("Error al reproducir audio:", e));
        }
    }

    function startTimerLogic() {
        if (timerState !== 'stopped') return;

        let initialExerciseTime = parseInt(exerciseTimeInput.value);
        let initialRecoveryTime = parseInt(recoveryTimeInput.value);
        let totalRounds = parseInt(roundsInput.value);

        if (isNaN(initialExerciseTime) || initialExerciseTime <= 0) initialExerciseTime = 60;
        if (isNaN(initialRecoveryTime) || initialRecoveryTime < 0) initialRecoveryTime = 30;
        if (isNaN(totalRounds) || totalRounds <= 0) totalRounds = 3;

        exerciseTimeInput.value = initialExerciseTime;
        recoveryTimeInput.value = initialRecoveryTime;
        roundsInput.value = totalRounds;

        localStorage.setItem('lastExerciseTime', initialExerciseTime);
        localStorage.setItem('lastRecoveryTime', initialRecoveryTime);
        localStorage.setItem('lastRounds', totalRounds);

        currentRound = 1;
        preTimerCount = 3;
        currentPhase = 'pre-start';
        timerState = 'pre-countdown';

        timerDisplay.textContent = `Preparate: ${preTimerCount}`;
        currentTimerInterval = setInterval(handleTimerTick, 1000);
        updateTimerUI();
    }

    function handleTimerTick() {
        if (currentPhase === 'pre-start') {
            preTimerCount--;
            timerDisplay.textContent = `Preparate: ${preTimerCount}`;
            if (preTimerCount <= 0) {
                currentPhase = 'exercise';
                timeLeftInPhase = parseInt(exerciseTimeInput.value);
                playAlarm(startAlarm);
            }
        } else if (currentPhase === 'exercise') {
            timeLeftInPhase--;
            if (timeLeftInPhase === Math.floor(parseInt(exerciseTimeInput.value) / 2) && parseInt(exerciseTimeInput.value) > 20) {
                playAlarm(midAlarm);
            }
            if (timeLeftInPhase === 10) {
                playAlarm(tenSecAlarm);
            }
            if (timeLeftInPhase <= 0) {
                clearInterval(currentTimerInterval); // Detener el intervalo actual
                if (currentRound < parseInt(roundsInput.value)) {
                    currentPhase = 'recovery';
                    timeLeftInPhase = parseInt(recoveryTimeInput.value);
                    if (timeLeftInPhase <= 0) { // Si no hay recuperación, ir a la siguiente ronda
                        currentRound++;
                        currentPhase = 'exercise'; // Directly to next exercise
                        timeLeftInPhase = parseInt(exerciseTimeInput.value);
                        playAlarm(startAlarm);
                    } else {
                        playAlarm(midAlarm); // Alarma de inicio de recuperación
                    }
                    currentTimerInterval = setInterval(handleTimerTick, 1000); // Iniciar nuevo intervalo
                } else {
                    finishTimer();
                    return;
                }
            }
        } else if (currentPhase === 'recovery') {
            timeLeftInPhase--;
            if (timeLeftInPhase === 10) {
                playAlarm(recoveryTenSecAlarm);
            }
            if (timeLeftInPhase <= 0) {
                clearInterval(currentTimerInterval); // Detener el intervalo actual
                currentRound++;
                if (currentRound <= parseInt(roundsInput.value)) {
                    currentPhase = 'exercise';
                    timeLeftInPhase = parseInt(exerciseTimeInput.value);
                    playAlarm(startAlarm);
                    currentTimerInterval = setInterval(handleTimerTick, 1000); // Iniciar nuevo intervalo
                } else {
                    finishTimer();
                    return;
                }
            }
        }
        updateTimerUI();
    }

    function finishTimer() {
        clearInterval(currentTimerInterval);
        timerDisplay.textContent = "¡Terminado!";
        playAlarm(endAlarm);
        timerState = 'stopped';
        updateTimerUI();
    }

    function resetTimer() {
        clearInterval(currentTimerInterval);
        timerState = 'stopped';
        preTimerCount = 3;
        currentRound = 1;
        currentPhase = 'pre-start';
        if (timerDisplay) {
            timerDisplay.textContent = formatTime(parseInt(exerciseTimeInput.value) || 60);
        }
        updateTimerUI();
    }

    if (startTimerBtn) {
        startTimerBtn.addEventListener('click', startTimerLogic);
        resetTimerBtn.addEventListener('click', resetTimer);

        // Cargar valores guardados del temporizador al inicio
        exerciseTimeInput.value = localStorage.getItem('lastExerciseTime') || 60;
        recoveryTimeInput.value = localStorage.getItem('lastRecoveryTime') || 30;
        roundsInput.value = localStorage.getItem('lastRounds') || 3;
        
        // Establecer el display inicial del temporizador
        if (timerDisplay) {
             timerDisplay.textContent = formatTime(parseInt(exerciseTimeInput.value));
        }
        updateTimerUI(); // Actualizar el estado de los botones al cargar
    }


    // --- Lógica de Guardado de Peso (en páginas diaX.html y peso_nutricion.html) ---
    const weightInputs = document.querySelectorAll('.weight-input');
    if (weightInputs.length > 0) {
        weightInputs.forEach(input => {
            const exerciseId = input.closest('.exercise').querySelector('h3').textContent.trim();
            const savedWeight = localStorage.getItem(`weight-${exerciseId}`);
            if (savedWeight) {
                input.value = savedWeight;
            }
            input.addEventListener('change', () => {
                localStorage.setItem(`weight-${exerciseId}`, input.value);
            });
        });
    }

    // --- Lógica de Seguimiento de Peso y Nutrición (en peso_nutricion.html) ---
    const weightForm = document.getElementById('weight-form');
    const weightInput = document.getElementById('current-weight');
    const weightHistoryList = document.getElementById('weight-history-list');

    const foodForm = document.getElementById('food-form');
    const foodDescriptionInput = document.getElementById('food-description');
    const foodLogList = document.getElementById('food-log-list');

    if (weightForm) { // Solo si estamos en la página peso_nutricion.html
        loadWeightHistory();
        loadFoodLog();

        weightForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const weight = parseFloat(weightInput.value);
            if (isNaN(weight) || weight <= 0) {
                alert('Por favor, ingresa un peso válido.');
                return;
            }

            const today = new Date().toLocaleDateString('es-AR');
            let history = JSON.parse(localStorage.getItem('weightHistory')) || [];

            const existingEntryIndex = history.findIndex(entry => entry.date === today);
            if (existingEntryIndex !== -1) {
                history[existingEntryIndex].weight = weight;
            } else {
                history.push({ date: today, weight: weight });
            }
            
            localStorage.setItem('weightHistory', JSON.stringify(history));
            weightInput.value = '';
            loadWeightHistory();
        });

        foodForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const description = foodDescriptionInput.value.trim();

            if (!description) {
                alert('Por favor, ingresa una descripción de la comida.');
                return;
            }

            const now = new Date();
            const dateStr = now.toLocaleDateString('es-AR');
            const timeStr = now.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });

            let foodLog = JSON.parse(localStorage.getItem('foodLog')) || {};

            if (!foodLog[dateStr]) {
                foodLog[dateStr] = [];
            }
            foodLog[dateStr].push({ time: timeStr, description });

            localStorage.setItem('foodLog', JSON.stringify(foodLog));
            foodDescriptionInput.value = '';
            loadFoodLog();
        });
    }

    function loadWeightHistory() {
        const history = JSON.parse(localStorage.getItem('weightHistory')) || [];
        weightHistoryList.innerHTML = '';
        history.sort((a, b) => {
            // Convertir fechas "DD/MM/YYYY" a objetos Date para comparar
            const [dayA, monthA, yearA] = a.date.split('/');
            const [dayB, monthB, yearB] = b.date.split('/');
            const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
            const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
            return dateB - dateA; // Ordena por fecha descendente (más reciente primero)
        });
        
        history.forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${entry.date}: <strong>${entry.weight} kg</strong></span> <button data-index="${index}" data-type="weight">Eliminar</button>`;
            weightHistoryList.appendChild(li);
        });
        document.querySelectorAll('#weight-history-list button').forEach(button => {
            button.addEventListener('click', deleteEntry);
        });
    }

    function loadFoodLog() {
        const foodLog = JSON.parse(localStorage.getItem('foodLog')) || {};
        foodLogList.innerHTML = '';

        const sortedDates = Object.keys(foodLog).sort((a, b) => {
            const [dayA, monthA, yearA] = a.split('/');
            const [dayB, monthB, yearB] = b.split('/');
            const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
            const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
            return dateB - dateA; // Ordena las fechas de forma descendente (más reciente primero)
        });

        sortedDates.forEach(dateStr => {
            const dayHeader = document.createElement('h4');
            dayHeader.textContent = dateStr;
            dayHeader.classList.add('day-header');
            foodLogList.appendChild(dayHeader);

            // Ordenar las comidas por hora dentro de cada día
            const mealsOfDay = foodLog[dateStr].sort((a, b) => {
                const [hourA, minuteA] = a.time.split(':').map(Number);
                const [hourB, minuteB] = b.time.split(':').map(Number);
                if (hourA !== hourB) return hourA - hourB;
                return minuteA - minuteB;
            });

            mealsOfDay.forEach((food, index) => {
                const li = document.createElement('li');
                li.classList.add('food-item');
                li.innerHTML = `<span>${food.time} - ${food.description}</span> <button data-index="${index}" data-type="food" data-date="${dateStr}">Eliminar</button>`;
                foodLogList.appendChild(li);
            });
        });

        document.querySelectorAll('#food-log-list button').forEach(button => {
            button.addEventListener('click', deleteEntry);
        });
    }

    function deleteEntry(event) {
        const indexToDelete = parseInt(event.target.dataset.index);
        const type = event.target.dataset.type;

        if (type === 'weight') {
            let history = JSON.parse(localStorage.getItem('weightHistory')) || [];
            history.splice(indexToDelete, 1);
            localStorage.setItem('weightHistory', JSON.stringify(history));
            loadWeightHistory();
        } else if (type === 'food') {
            const dateToDelete = event.target.dataset.date;
            let foodLog = JSON.parse(localStorage.getItem('foodLog')) || {};
            if (foodLog[dateToDelete]) {
                // Hay que re-ordenar el array para obtener el index correcto
                const mealsOfDay = foodLog[dateToDelete].sort((a, b) => {
                    const [hourA, minuteA] = a.time.split(':').map(Number);
                    const [hourB, minuteB] = b.time.split(':').map(Number);
                    if (hourA !== hourB) return hourA - hourB;
                    return minuteA - minuteB;
                });
                
                // Remover el elemento por su índice en el array ORDENADO
                mealsOfDay.splice(indexToDelete, 1);
                
                // Actualizar el objeto foodLog con el array modificado
                if (mealsOfDay.length === 0) {
                    delete foodLog[dateToDelete];
                } else {
                    foodLog[dateToDelete] = mealsOfDay;
                }
                localStorage.setItem('foodLog', JSON.stringify(foodLog));
            }
            loadFoodLog();
        }
    }
});
