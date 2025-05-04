document.addEventListener("DOMContentLoaded", () => {
  const routineForm = document.getElementById("routineForm");
  const routineOutput = document.getElementById("routineOutput");
  const routineResult = document.getElementById("routineResult");
  const saveBtn = document.getElementById("saveRoutineBtn");

  routineForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const gender = document.getElementById("gender").value;
    const age = parseInt(document.getElementById("age").value);
    const weight = parseInt(document.getElementById("weight").value);
    const height = parseInt(document.getElementById("height").value);
    const experience = document.getElementById("experience").value;
    const goal = document.getElementById("goal").value;
    const location = document.getElementById("location").value;
    const days = parseInt(document.getElementById("days").value);

    const routine = generateRoutine({
      gender,
      age,
      weight,
      height,
      experience,
      goal,
      location,
      days,
    });

    routineResult.textContent = routine;
    routineOutput.style.display = "block";
  });

  saveBtn.addEventListener("click", () => {
    const rutinaTexto = routineResult.textContent;
    if (!rutinaTexto) {
      alert("Primero generá una rutina.");
      return;
    }

    const fecha = new Date().toLocaleString();
    const rutinaGuardada = {
      fecha,
      contenido: rutinaTexto,
    };

    let rutinas = JSON.parse(localStorage.getItem("misRutinas")) || [];
    rutinas.push(rutinaGuardada);
    localStorage.setItem("misRutinas", JSON.stringify(rutinas));

    alert("✅ Rutina guardada correctamente.");
  });

  function generateRoutine({
    gender,
    age,
    weight,
    height,
    experience,
    goal,
    location,
    days,
  }) {
    let routine = `📋 Rutina personalizada para ${gender}, ${age} años, ${weight}kg, ${height}cm\n`;
    routine += `🎯 Objetivo: ${goal} | Nivel: ${experience} | Lugar: ${location} | Días: ${days}\n`;
    routine += `\n🔥 PLAN SEMANAL:\n`;

    if (days <= 3) {
      for (let i = 1; i <= days; i++) {
        routine += `\n🦾 Día ${i}: Full Body (${location})\n`;
        routine +=
          location === "gimnasio"
            ? getGymFullBody(experience)
            : getHomeFullBody(experience);
      }
    } else if (days === 4) {
      routine += splitUpperLower(location, experience);
    } else if (days === 5) {
      routine += splitPushPullLegs(location, experience);
    }

    return routine;
  }

  function getGymFullBody(level) {
    return `- Sentadillas con barra 3x10\n- Press banca 3x10\n- Peso muerto 3x10\n- Remo con barra 3x10\n- Cardio: 15 minutos\n`;
  }

  function getHomeFullBody(level) {
    return `- Sentadillas 3x15\n- Flexiones 3x10\n- Puente de glúteos 3x15\n- Plancha 3x30 seg\n- Cardio suave: 10-15 min\n`;
  }

  function splitUpperLower(location, level) {
    const upper =
      location === "gimnasio"
        ? "- Press banca\n- Jalones al pecho\n- Curl bíceps\n- Extensiones tríceps\n"
        : "- Flexiones\n- Remo con mochila\n- Curl con botellas\n- Fondos entre sillas\n";

    const lower =
      location === "gimnasio"
        ? "- Sentadillas\n- Prensa\n- Curl femoral\n- Abductores\n"
        : "- Sentadillas\n- Puente de glúteos\n- Zancadas\n- Elevaciones de pantorrillas\n";

    return `\n🦾 Día 1: Tren superior\n${upper}\n🦿 Día 2: Tren inferior\n${lower}\n🦾 Día 3: Tren superior\n${upper}\n🦿 Día 4: Tren inferior\n${lower}\n`;
  }

  function splitPushPullLegs(location, level) {
    const push =
      location === "gimnasio"
        ? "- Press de pecho\n- Press militar\n- Extensiones tríceps\n"
        : "- Flexiones\n- Elevaciones laterales con botellas\n- Fondos entre sillas\n";

    const pull =
      location === "gimnasio"
        ? "- Jalones al pecho\n- Remo en máquina\n- Curl bíceps\n"
        : "- Remo con mochila\n- Curl con botellas\n- Superman\n";

    const legs =
      location === "gimnasio"
        ? "- Prensa\n- Curl femoral\n- Sentadillas\n"
        : "- Sentadillas\n- Zancadas\n- Elevaciones de talón\n";

    return `\n💥 Día 1: Push\n${push}\n💪 Día 2: Pull\n${pull}\n🦵 Día 3: Legs\n${legs}\n💥 Día 4: Push\n${push}\n💪 Día 5: Pull\n${pull}\n`;
  }
});
