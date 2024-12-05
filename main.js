const currentPage = document.body.id;
let tablas = [];

if(currentPage === "inicio"){
    const botones = document.querySelectorAll(".boton");
    const todas = document.querySelector(".todas");
    const btnEmpezar = document.querySelector(".empezar");

    //funcionalidad de los botones de las tablas
    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
                if (boton.classList.contains("pulsado")){
                    boton.classList.remove("pulsado");
                }else{
                    tablas.push(parseInt(boton.innerText)) //ver cuales botones estan presionados para guardar esos datos en un array
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

    tablas = JSON.parse(localStorage.getItem("tablas"));
    cantidadOperaciones = 16;

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
    
    
        for (let i = 0; i < cantidadOperaciones; i++) {
        
            const multiplicando = elegirNumerosAleatorios(tablas);
            const multiplicador = elegirEliminar(arrayNumeros);
            const resultado = multiplicando * multiplicador;
            const multVisual = `${multiplicando} x ${multiplicador}`;
            console.log((i + 1) + '. ' + multVisual);
    
            h1multiplicacion.innerText = multVisual;

            const respuesta = await esperarEnvioFormulario(formulario);

            h1multiplicacion.innerText = "";
    
            if (respuesta == resultado){
                console.log("correcto");
            }else{
                console.log("incorrecto");
            }
    
            inputRespuesta.value = "";
        }

        localStorage.clear();
        window.location.href = "puntuación.html";
    }

    main();
}

else if (currentPage === "puntuacion"){
    const volver = document.querySelector(".volver")
    volver.addEventListener("click", () => {
        console.log('boton pulsado');
        window.location.href = "inicio.html";
    });
}      