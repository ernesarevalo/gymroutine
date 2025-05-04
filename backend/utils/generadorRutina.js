
// Lógica de generación de rutina según parámetros
function generarRutina(usuario) {
    const { edad, peso, altura, objetivo, experiencia, genero, dias, modalidad } = usuario;

    // Determinar tipo de rutina
    let tipoRutina = "fullbody";
    if (dias === 4) tipoRutina = "upper-lower";
    if (dias === 5) tipoRutina = "push-pull-legs";

    // Filtrar ejercicios según modalidad
    const ejercicios = require('../data/ejercicios.json');
    const ejerciciosFiltrados = ejercicios.filter(ej => 
        ej.modalidad === modalidad &&
        ej.nivel.includes(experiencia)
    );

    // Agrupar ejercicios por grupo muscular
    const grupos = ["pecho", "espalda", "piernas", "hombros", "brazos", "core"];
    const rutina = {};

    for (let grupo of grupos) {
        rutina[grupo] = ejerciciosFiltrados
            .filter(ej => ej.grupo === grupo)
            .slice(0, dias >= 4 ? 3 : 2);  // Selección simple
    }

    return {
        tipo: tipoRutina,
        rutina: rutina
    };
}

module.exports = generarRutina;
