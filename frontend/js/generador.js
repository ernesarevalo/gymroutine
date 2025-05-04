document.getElementById("rutinaForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const datos = {
    edad: parseInt(form.edad.value),
    peso: parseInt(form.peso.value),
    altura: parseInt(form.altura.value),
    objetivo: form.objetivo.value,
    experiencia: form.experiencia.value,
    genero: form.genero.value,
    dias: parseInt(form.dias.value),
  };

  const res = await fetch("https://rutinas-kof.onrender.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos),
  });

  const data = await res.json();

  const salida = document.getElementById("resultado");
  salida.innerHTML = `<h2>Rutina Generada:</h2><ul>${data.rutina
    .map((d) => `<li>${d}</li>`)
    .join("")}</ul><p>${data.mensaje}</p>`;
});
