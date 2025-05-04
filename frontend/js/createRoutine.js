// frontend/js/createRoutine.js
document
  .getElementById("routineForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const days = document.getElementById("days").value;
    const goal = document.getElementById("goal").value;

    alert(`Rutina generada: ${days} días de entrenamiento para ${goal}.`);
  });
