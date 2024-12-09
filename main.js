const currentPage = document.body.id;
let tablas = [];
let tiempoTranscurrido;
let puntuacion = 0;

if(currentPage === "inicio"){
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
                    let indextabla = tablas.indexOf(boton.innerText);
                    boton.classList.add("pulsado");
                }
        });
    });

    
    btnEmpezar.addEventListener("click", () => {
        localStorage.setItem("tablas", JSON.stringify(tablas));
        window.location.href = "index.html";
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

else if(currentPage === "index"){
    const timerBar = document.getElementById("timer-bar");
    const formulario = document.getElementById("formulario");
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
    
    function elegirNumerosAleatorios(numeros) {
        let copiaNumeros = [...numeros];
        let indiceAleatorio = Math.floor(Math.random() * copiaNumeros.length);
        return copiaNumeros[indiceAleatorio];
    }
    
    function esperarEnvioFormulario(formulario) {
        return new Promise((resolve) => {
            const formulario = document.getElementById('formulario');
            formulario.addEventListener('submit', (Event) => {
                // Evitar el comportamiento predeterminado
                Event.preventDefault();
    
                respuesta = parseInt(document.getElementById('respuesta').value);
                // Resolver la Promesa con los datos
                resolve(respuesta);
            }), {once: true};
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
    
                // Cambiar el color dependiendo del tiempo restante
                if (tiempoRestante <= 3) {
                    timerBar.style.backgroundColor = "red";
                } else if (tiempoRestante <= 5) {
                    timerBar.style.backgroundColor = "orange";
                }
    
                // Si se acaba el tiempo
                if (tiempoRestante <= 0) {
                    clearInterval(intervalo);
                }
            }, 1000); // Actualiza cada 1 segundo
        }
        function reiniciarTemporizador() {
            clearInterval(intervalo); // Detener el intervalo actual
            tiempoRestante = tiempoTotal; // Restablecer el tiempo restante
            timerBar.style.width = "100%"; // Reiniciar el ancho de la barra
            timerBar.style.backgroundColor = "#4caf50"; // Color inicial
            tiempoTranscurrido = 0;
        }
    
    
        for (let i = 0; i < cantidadOperaciones; i++) {
            const multiplicando = elegirNumerosAleatorios(tablas);
            const multiplicador = elegirEliminar(arrayNumeros);
            const resultado = multiplicando * multiplicador;
            const multVisual = `${multiplicando} x ${multiplicador}`;
            console.log((i + 1) + '. ' + multVisual);
    
            h1multiplicacion.innerText = multVisual;
            iniciarTemporizador();

            const respuesta = await esperarEnvioFormulario(formulario);

            clearInterval(intervalo); // Detener el temporizador
            tiempoTranscurrido = tiempoTotal - tiempoRestante; // Calcular tiempo usado

            h1multiplicacion.innerText = "";
    
            if (respuesta == resultado){
                console.log("correcto");
                cambioDeColorCorrecto();
                puntuacion = puntuacion + ((10 - tiempoTranscurrido) * 100)
            }else{
                console.log("incorrecto");
                cambioDeColorIncorrecto();
                puntuacion = puntuacion - 500
            }
            inputRespuesta.value = "";
            console.log(tiempoTranscurrido);
            console.log(puntuacion);
            reiniciarTemporizador();
        }

        window.location.href = "puntuación.html";
    }

    main();
    localStorage.clear();
}

else if (currentPage === "puntuacion"){
    const volver = document.querySelector(".volver")
    volver.addEventListener("click", () => {
        console.log('boton pulsado');
        window.location.href = "inicio.html";
    });
}      