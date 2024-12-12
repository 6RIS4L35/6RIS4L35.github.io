const currentPage = document.body.id;
let tablas = [];
let tiempos = [];
let tiempoTranscurrido;
let puntuacion = 0;
let correctos = 0;
let incorrectos = 0;

if(currentPage === "index"){
    const botones = document.querySelectorAll(".boton");
    const todas = document.querySelector(".todas");
    const btnEmpezar = document.querySelector(".empezar");
    

    //funcionalidad de los botones de las tablas
    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
                if (boton.classList.contains("pulsado")){
                    let indextabla = tablas.indexOf(parseInt(boton.innerText));
                    tablas.splice(indextabla, 1)
                    boton.classList.remove("pulsado");
                }else{
                    tablas.push(parseInt(boton.innerText)); //ver cuales botones estan presionados para guardar esos datos en un array
                    boton.classList.add("pulsado");
                }
        });
    });

    
    btnEmpezar.addEventListener("click", () => {
        localStorage.setItem("tablas", JSON.stringify(tablas));
        window.location.href = "juego.html";
    });

    todas.addEventListener("click", () =>{
        botones.forEach((boton) => {
            if (!boton.classList.contains("pulsado")){
                boton.classList.add("pulsado");
            }else{
                boton.classList.remove("pulsado");
            }
        });
    });
}

else if(currentPage === "juego"){
    const timerBar = document.getElementById("timer-bar");
    const formulario = document.getElementById("formulario");
    const respuestaBox = document.getElementById("respuesta")
    tablas = JSON.parse(localStorage.getItem("tablas"));
    cantidadOperaciones = 16;
    let tiempoTotal = 10; // Tiempo total en segundos
    let tiempoRestante = tiempoTotal; // Tiempo restante que irá disminuyendo
    let intervalo;

    function convertirArray(rango) {
        return Array.from({ length: rango }, (_, i) => i + 1);
    }
    
    function elegirEliminar(numeros){
        let indiceAleatorio = Math.floor(Math.random() * numeros.length);
        return numeros.splice(indiceAleatorio, 1)[0];
    }
    
    function elegirNumerosAleatorios(numeros){
        let copiaNumeros = [...numeros];
        let indiceAleatorio = Math.floor(Math.random() * copiaNumeros.length);
        return copiaNumeros[indiceAleatorio];
    }
    
    function esperarEnvioFormulario(formulario) {
        return new Promise((resolve) => {
            const inputRespuesta = document.getElementById('respuesta');
            let temporizador;
    
            // Evento de envío del formulario
            formulario.addEventListener('submit', (event) => {
                event.preventDefault();
                clearTimeout(temporizador); // Cancela el temporizador
                const respuesta = parseInt(inputRespuesta.value) || 0; // Captura la respuesta, considera 0 si no es válida
                resolve(respuesta);
            }, { once: true });
    
            // Temporizador para manejar el tiempo agotado
            temporizador = setTimeout(() => {
                resolve(null); // Devuelve null si el tiempo se acaba
            }, tiempoRestante * 1000);
        });
    }
    async function main() {
        const h1multiplicacion = document.getElementById("multiplicacion");
        const arrayNumeros = convertirArray(cantidadOperaciones);
        const inputRespuesta = document.getElementById('respuesta');
        const body = document.getElementById("index");

        function pausa(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        async function cambioDeColorCorrecto() {
            body.classList.add("correcto")
            await pausa(100);
            body.classList.remove("correcto")
        }
        async function cambioDeColorIncorrecto() {
            body.classList.add("incorrecto")
            await pausa(100);
            body.classList.remove("incorrecto")
        }
        function iniciarTemporizador() {
            intervalo = setInterval(() => {
                tiempoRestante--;
    
                // Reducir el ancho de la barra
                const ancho = (tiempoRestante / tiempoTotal) * 100; // Porcentaje restante
                timerBar.style.width = `${ancho}%`;
    

            }, 1000); // Actualiza cada 1 segundo
        }
        function reiniciarTemporizador() {
            clearInterval(intervalo); // Detener el intervalo actual
            tiempoRestante = tiempoTotal; // Restablecer el tiempo restante
            timerBar.style.width = "100%"; // Reiniciar el ancho de la barra
            tiempoTranscurrido = 0;
        }
        function respuestaCorrecta(){
            console.log("correcto");
            cambioDeColorCorrecto();
            correctos++;
            puntuacion = puntuacion + ((tiempoTotal - tiempoTranscurrido) * 100);
        }
        function respuestaInorrecta(){
            console.log("incorrecto");
            cambioDeColorIncorrecto();
            incorrectos++;
            puntuacion = puntuacion - 500;
        }

        respuestaBox.focus();

        respuestaBox.addEventListener("blur", () => {
            respuestaBox.focus();
        })
    
    
        for (let i = 0; i < cantidadOperaciones; i++) {
            iniciarTemporizador();
            const multiplicando = elegirNumerosAleatorios(tablas);
            const multiplicador = elegirEliminar(arrayNumeros);
            const resultado = multiplicando * multiplicador;
            const multVisual = `${multiplicando} x ${multiplicador}`;
            console.log((i + 1) + '. ' + multVisual);
    
            h1multiplicacion.innerText = multVisual;

            const respuesta = await esperarEnvioFormulario(formulario);

            clearInterval(intervalo); // Detener el temporizador
            tiempoTranscurrido = tiempoTotal - tiempoRestante; // Calcular tiempo usado

            h1multiplicacion.innerText = "";
    
            if (respuesta === null || respuesta !== resultado){
                respuestaInorrecta();
            }else{
                respuestaCorrecta();
            }
            
            tiempos.push(tiempoTranscurrido);
            inputRespuesta.value = "";
            console.log(tiempoTranscurrido);
            console.log(puntuacion);
            reiniciarTemporizador();
        }

        window.location.href = "puntuación.html";
        localStorage.setItem("puntuacion", JSON.stringify(puntuacion));
        localStorage.setItem("correctos", JSON.stringify(correctos));
        localStorage.setItem("incorrectos", JSON.stringify(incorrectos));
        localStorage.setItem("tiempos", JSON.stringify(tiempos));
    }

    main();
    localStorage.removeItem("tablas");
}else if (currentPage === "puntuacion"){
    const volver = document.querySelector(".volver");
    const itemPuntuacion = document.querySelector(".puntuacion");
    const itemCorrectos = document.querySelector(".correctos");
    const itemIncorrectos = document.querySelector(".incorrectos");
    const itemTiempoPromedio = document.querySelector(".tiempoPromedio");
    puntuacion = JSON.parse(localStorage.getItem("puntuacion"));
    correctos = JSON.parse(localStorage.getItem("correctos"));
    incorrectos = JSON.parse(localStorage.getItem("incorrectos"));
    tiempos = JSON.parse(localStorage.getItem("tiempos"));

    promedioTiempos = tiempos.reduce((i, actual) => i + actual, 0) / tiempos.length;
    promedioTiempos = Math.round(promedioTiempos * 100) / 100;

    itemPuntuacion.innerText = `Puntos: ${puntuacion}`;
    itemCorrectos.innerText = `Correctos: ${correctos}`;
    itemIncorrectos.innerText = `Incorrectos: ${incorrectos}`;
    itemTiempoPromedio.innerText = `Tiempo promedio: ${promedioTiempos}seg`;

    

    volver.addEventListener("click", () => {
        console.log('boton pulsado');
        window.location.href = "index.html";
        localStorage.clear();
    });
}