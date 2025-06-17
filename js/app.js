// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de Temporizador ---
    const timerDisplay = document.getElementById('timer-display');
    const exerciseTimeInput = document.getElementById('exercise-time');
    const recoveryTimeInput = document.getElementById('recovery-time');
    const roundsInput = document.getElementById('rounds');
    const startTimerBtn = document.getElementById('start-timer-btn');
    const resetTimerBtn = document.getElementById('reset-timer-btn');

    let currentTimer; // Para almacenar el setInterval
    let timeLeft;
    let currentRound = 1;
    let isRecovery = false; // true si estamos en fase de recuperación, false si es ejercicio
    let preTimerCount = 3; // Contador de 3 segundos antes de empezar
    let timerRunning = false;

    // Alarmas (ajusta las rutas a tus archivos de audio)
    const startAlarm = new Audio('img/audio/start_alarm.mp3'); // Crea una carpeta 'audio' dentro de 'img'
    const midAlarm = new Audio('img/audio/mid_alarm.mp3');
    const tenSecAlarm = new Audio('img/audio/ten_sec_alarm.mp3');
    const recoveryTenSecAlarm = new Audio('img/audio/recovery_ten_sec_alarm.mp3');

    // Cargar volúmenes (opcional, ajusta si quieres que sean más bajos o altos)
    startAlarm.volume = 0.7;
    midAlarm.volume = 0.5;
    tenSecAlarm.volume = 0.8;
    recoveryTenSecAlarm.volume = 0.8;


    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    function updateTimerDisplay() {
        timerDisplay.textContent = formatTime(timeLeft);
    }

    function playAlarm(alarm) {
        alarm.currentTime = 0; // Reinicia el audio si ya está sonando
        alarm.play().catch(e => console.error("Error al reproducir audio:", e));
    }

    function startCountdown() {
        if (timerRunning) return;
        timerRunning = true;
        
        startTimerBtn.disabled = true;
        resetTimerBtn.disabled = false;

        let initialExerciseTime = parseInt(exerciseTimeInput.value);
        let initialRecoveryTime = parseInt(recoveryTimeInput.value);
        let totalRounds = parseInt(roundsInput.value);

        if (isNaN(initialExerciseTime) || initialExerciseTime <= 0) initialExerciseTime = 60;
        if (isNaN(initialRecoveryTime) || initialRecoveryTime < 0) initialRecoveryTime = 30; // Puede ser 0
        if (isNaN(totalRounds) || totalRounds <= 0) totalRounds = 1;

        exerciseTimeInput.value = initialExerciseTime;
        recoveryTimeInput.value = initialRecoveryTime;
        roundsInput.value = totalRounds;

        preTimerCount = 3;
        timerDisplay.textContent = `Preparate: ${preTimerCount}`;
        
        const preTimer = setInterval(() => {
            preTimerCount--;
            timerDisplay.textContent = `Preparate: ${preTimerCount}`;
            if (preTimerCount <= 0) {
                clearInterval(preTimer);
                startRound();
            }
        }, 1000);
    }

    function startRound() {
        if (currentRound > parseInt(roundsInput.value)) {
            finishTimer();
            return;
        }

        if (!isRecovery) { // Fase de Ejercicio
            timeLeft = parseInt(exerciseTimeInput.value);
            timerDisplay.style.color = var('--header-color-dark'); // Color principal del temporizador
            updateTimerDisplay();
            playAlarm(startAlarm); // Alarma de inicio de ejercicio
            console.log(`Ronda ${currentRound}: Ejercicio`);

            currentTimer = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();

                if (timeLeft === Math.floor(parseInt(exerciseTimeInput.value) / 2) && parseInt(exerciseTimeInput.value) > 20) {
                    playAlarm(midAlarm); // Alarma de mitad de tiempo
                }
                if (timeLeft === 10) {
                    playAlarm(tenSecAlarm); // Alarma de 10 segundos restantes
                }

                if (timeLeft <= 0) {
                    clearInterval(currentTimer);
                    isRecovery = true;
                    startRound(); // Pasa a fase de recuperación o siguiente ronda
                }
            }, 1000);
        } else { // Fase de Recuperación
            timeLeft = parseInt(recoveryTimeInput.value);
            if (timeLeft <= 0) { // Si no hay tiempo de recuperación
                isRecovery = false;
                currentRound++;
                startRound();
                return;
            }
            timerDisplay.style.color = var('--accent-color-dark'); // Color para recuperación
            updateTimerDisplay();
            playAlarm(midAlarm); // Alarma de inicio de recuperación (reutilizamos midAlarm)
            console.log(`Ronda ${currentRound}: Recuperación`);

            currentTimer = setInterval(() => {
                timeLeft--;
                updateTimerDisplay();

                if (timeLeft === 10) {
                    playAlarm(recoveryTenSecAlarm); // Alarma de 10 segundos restantes de recuperación
                }

                if (timeLeft <= 0) {
                    clearInterval(currentTimer);
                    isRecovery = false;
                    currentRound++;
                    startRound();
                }
            }, 1000);
        }
    }

    function finishTimer() {
        clearInterval(currentTimer);
        timerDisplay.textContent = "¡Terminado!";
        timerDisplay.style.color = var(--accent-color-dark);
        playAlarm(startAlarm); // Alarma final (reutilizamos startAlarm)
        timerRunning = false;
        startTimerBtn.disabled = false;
        resetTimerBtn.disabled = false;
        currentRound = 1;
        isRecovery = false;
    }

    function resetTimer() {
        clearInterval(currentTimer);
        timerRunning = false;
        currentRound = 1;
        isRecovery = false;
        timeLeft = parseInt(exerciseTimeInput.value);
        updateTimerDisplay();
        timerDisplay.style.color = var('--header-color-dark');
        startTimerBtn.disabled = false;
        resetTimerBtn.disabled = true;
    }

    if (startTimerBtn) { // Solo si estamos en una página con el temporizador
        startTimerBtn.addEventListener('click', startCountdown);
        resetTimerBtn.addEventListener('click', resetTimer);
        // Inicializar display al cargar la página
        exerciseTimeInput.value = localStorage.getItem('lastExerciseTime') || 60;
        recoveryTimeInput.value = localStorage.getItem('lastRecoveryTime') || 30;
        roundsInput.value = localStorage.getItem('lastRounds') || 3;
        timeLeft = parseInt(exerciseTimeInput.value);
        updateTimerDisplay();

        // Guardar valores del temporizador cuando cambian
        exerciseTimeInput.addEventListener('change', () => localStorage.setItem('lastExerciseTime', exerciseTimeInput.value));
        recoveryTimeInput.addEventListener('change', () => localStorage.setItem('lastRecoveryTime', recoveryTimeInput.value));
        roundsInput.addEventListener('change', () => localStorage.setItem('lastRounds', roundsInput.value));
    }


    // --- Lógica de Guardado de Peso (en páginas diaX.html) ---
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
    const foodCaloriesInput = document.getElementById('food-calories');
    const foodList = document.getElementById('food-list');
    const dailyCaloriesDisplay = document.getElementById('daily-calories-display');

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

            // Actualizar si ya existe una entrada para hoy, si no, agregar
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
            const calories = parseFloat(foodCaloriesInput.value);

            if (!description || isNaN(calories) || calories <= 0) {
                alert('Por favor, ingresa una descripción y calorías válidas.');
                return;
            }

            const today = new Date().toLocaleDateString('es-AR');
            let foodLog = JSON.parse(localStorage.getItem('foodLog')) || {};

            if (!foodLog[today]) {
                foodLog[today] = [];
            }
            foodLog[today].push({ description, calories });

            localStorage.setItem('foodLog', JSON.stringify(foodLog));
            foodDescriptionInput.value = '';
            foodCaloriesInput.value = '';
            loadFoodLog();
        });
    }

    function loadWeightHistory() {
        const history = JSON.parse(localStorage.getItem('weightHistory')) || [];
        weightHistoryList.innerHTML = '';
        history.sort((a, b) => new Date(b.date.split('/').reverse().join('-')) - new Date(a.date.split('/').reverse().join('-'))); // Ordena por fecha descendente
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
        const today = new Date().toLocaleDateString('es-AR');
        const foodLog = JSON.parse(localStorage.getItem('foodLog')) || {};
        const dailyFoods = foodLog[today] || [];
        
        foodList.innerHTML = '';
        let totalCalories = 0;

        dailyFoods.forEach((food, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${food.description} - ${food.calories} kcal</span> <button data-index="${index}" data-type="food" data-date="${today}">Eliminar</button>`;
            foodList.appendChild(li);
            totalCalories += food.calories;
        });
        dailyCaloriesDisplay.textContent = totalCalories;

        document.querySelectorAll('#food-list button').forEach(button => {
            button.addEventListener('click', deleteEntry);
        });
    }

    function deleteEntry(event) {
        const indexToDelete = parseInt(event.target.dataset.index);
        const type = event.target.dataset.type;

        if (type === 'weight') {
            let history = JSON.parse(localStorage.getItem('weightHistory')) || [];
            history.splice(indexToDelete, 1); // Elimina 1 elemento en la posición indexToDelete
            localStorage.setItem('weightHistory', JSON.stringify(history));
            loadWeightHistory();
        } else if (type === 'food') {
            const dateToDelete = event.target.dataset.date;
            let foodLog = JSON.parse(localStorage.getItem('foodLog')) || {};
            if (foodLog[dateToDelete]) {
                foodLog[dateToDelete].splice(indexToDelete, 1);
                // Si no quedan comidas para esa fecha, eliminamos la fecha
                if (foodLog[dateToDelete].length === 0) {
                    delete foodLog[dateToDelete];
                }
                localStorage.setItem('foodLog', JSON.stringify(foodLog));
            }
            loadFoodLog();
        }
    }
});
