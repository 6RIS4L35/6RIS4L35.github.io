document.addEventListener("DOMContentLoaded", () => {
    const timerBar = document.getElementById("timer-bar");
    const formulario = document.getElementById("formulario");

    let tiempoTotal = 10; // Tiempo total en segundos
    let tiempoRestante = tiempoTotal; // Tiempo restante que irá disminuyendo
    let intervalo;

    // Iniciar el temporizador
    function iniciarTemporizador() {
        intervalo = setInterval(() => {
            tiempoRestante--;

            // Reducir el ancho de la barra
            const ancho = (tiempoRestante / tiempoTotal) * 100; // Porcentaje restante
            timerBar.style.width = `${ancho}%`;

        }, 1000); // Actualiza cada 1 segundo
    }

    // Manejar el envío del formulario
    formulario.addEventListener("submit", (event) => {
        clearInterval(intervalo); // Detener el temporizador
        const tiempoTranscurrido = tiempoTotal - tiempoRestante; // Calcular tiempo usado

        alert(`Formulario enviado. Tiempo transcurrido: ${tiempoTranscurrido} segundos.`);
    });

    // Inicia el temporizador al cargar la página
    iniciarTemporizador();
});