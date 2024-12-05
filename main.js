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
    const tablas = [parseInt(prompt("Ingresa las tablas que quieres aprender"))];
    const cantidadOperaciones = parseInt(prompt("Ingresa la cantidad de operaciones"));
    const arrayNumeros = convertirArray(cantidadOperaciones);
    const inputRespuesta = document.getElementById('respuesta');


    for (let i = 0; i < cantidadOperaciones; i++) {
    
        const multiplicando = elegirNumerosAleatorios(tablas);
        const multiplicador = elegirEliminar(arrayNumeros);
        const resultado = multiplicando * multiplicador;
        const multVisual = `${multiplicando} x ${multiplicador}`;
        console.log((i + 1) + '. ' + multVisual);

        h1multiplicacion.innerText = multVisual;

        console.log("Esperando que se envíe el formulario...");

        const respuesta = await esperarEnvioFormulario(formulario);
        h1multiplicacion.innerText = "";

        if (respuesta == resultado){
            console.log("correcto");
        }else{
            console.log("incorrecto");
        }

        inputRespuesta.value = "";
    }
}

const currentPage = document.body.id;

if(currentPage === "inicio"){
    const botones = document.querySelectorAll(".boton");
    const todas = document.querySelector(".todas");

    botones.forEach((boton) => {
        boton.addEventListener("click", () => {
                if (boton.classList.contains("pulsado")){
                    boton.classList.remove("pulsado");
                }else{
                    boton.classList.add("pulsado");
                }
        });
    });

    todas.addEventListener("click", () =>{
        botones.forEach((boton) => {
            if (!boton.classList.contains("pulsado")){
                boton.classList.add("pulsado");
            }else{
                boton.classList.remove("pulsado");
            }
        });
    } )
}else if(currentPage === "index"){
     main();
}else{
    
}      