document.addEventListener("DOMContentLoaded", () => {
  const routineList = document.getElementById("routineList");

  // Obtener las rutinas guardadas de localStorage
  const rutinas = JSON.parse(localStorage.getItem("misRutinas")) || [];

  // Si no hay rutinas guardadas, mostrar mensaje
  if (rutinas.length === 0) {
    routineList.innerHTML = "<p>No has guardado ninguna rutina aún.</p>";
    return;
  }

  // Mostrar las rutinas
  rutinas.forEach((rutina, index) => {
    const rutinaDiv = document.createElement("div");
    rutinaDiv.classList.add("routine-item");
    rutinaDiv.innerHTML = `
        <h3>Rutina Guardada - ${rutina.fecha}</h3>
        <pre>${rutina.contenido}</pre>
        <button class="deleteBtn" data-index="${index}">Borrar</button>
      `;
    routineList.appendChild(rutinaDiv);
  });

  // Funcionalidad de borrar
  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      deleteRoutine(index);
    });
  });

  // Función para borrar una rutina
  function deleteRoutine(index) {
    let rutinas = JSON.parse(localStorage.getItem("misRutinas"));
    rutinas.splice(index, 1); // Eliminar la rutina por índice
    localStorage.setItem("misRutinas", JSON.stringify(rutinas));

    // Recargar la página para reflejar los cambios
    location.reload();
  }
});
