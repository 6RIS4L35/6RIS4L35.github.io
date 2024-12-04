function convertirArray(rango) {
    let numeros = Array.from({ length: rango }, (_, i) => i + 1);
    return numeros
}

function elegirEliminar(numeros){
    let indiceAleatorio = Math.floor(Math.random() * numeros.length);
    let numeroSeleccionado = numeros.splice(indiceAleatorio, 1)[0];

    return numeroSeleccionado
}

function elegirNumerosAleatorios(numeros) {
    let copiaNumeros = [...numeros];
    let indiceAleatorio = Math.floor(Math.random() * copiaNumeros.length);
    numeroAleatorio = copiaNumeros[indiceAleatorio];
    return numeroAleatorio
}

function esperarEnvioFormulario(formulario) {
    return new Promise((resolve) => {
        formulario.addEventListener('submit', function(event) {
            // Evitar el comportamiento predeterminado
            event.preventDefault();

            respuesta = parseInt(document.getElementById("respuesta").value);
            // Resolver la Promesa con los datos
            resolve(respuesta);
        });
    });
}

async function main() {
    const formulario = document.getElementById('formulario');

    console.log("Esperando que se envíe el formulario...");

    // Esperar hasta que se envíe el formulario
    const respuesta = await esperarEnvioFormulario(formulario);

    console.log("Formulario enviado:");

    console.log(respuesta);

    h1multiplicacion.innerText = "";

    if (respuesta == resultado){
        console.log("correcto");
    }else{
        console.log("incorrecto");
    }


}

const h1multiplicacion = document.getElementById("multiplicacion");
const formulario = document.getElementById("formulario").addEventListener('submit', (Event) => {Event.preventDefault();})
let tablas = [parseInt(prompt("Ingresa las tablas que quieres aprender"))];
let cantidadOperaciones = parseInt(prompt("Ingresa la cantidad de operaciones"));
let arrayNumeros = convertirArray(cantidadOperaciones);
let multiplicando;
let multiplicador;
let multiplicacion = {};
let multVisual;
let respuesta;


for (let i = 0; i < cantidadOperaciones; i++) {
    main();
    multiplicando = elegirNumerosAleatorios(tablas);
    multiplicador = elegirEliminar(arrayNumeros);
    resultado = multiplicando * multiplicador;
    multVisual = `${multiplicando} x ${multiplicador}`;
    console.log((i + 1) + '. ' + multVisual);

    h1multiplicacion.innerText = multVisual;
    
}