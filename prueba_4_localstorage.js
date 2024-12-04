function convertirArray(rango) {
    return Array.from({ length: rango }, (_, i) => i + 1);
}

function elegirEliminar(numeros) {
    let indiceAleatorio = Math.floor(Math.random() * numeros.length);
    return numeros.splice(indiceAleatorio, 1)[0];
}

function elegirNumerosAleatorios(numeros) {
    let indiceAleatorio = Math.floor(Math.random() * numeros.length);
    return numeros[indiceAleatorio];
}

function esperarEnvioFormulario() {
    return new Promise((resolve) => {
        const formulario = document.getElementById("formulario");
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();
            const respuesta = parseInt(document.getElementById("respuesta").value);
            resolve(respuesta);
        }, { once: true }); // Se ejecuta solo una vez por envío
    });
}

async function main() {
    const tablas = [parseInt(prompt("Ingresa las tablas que quieres aprender"))];
    const cantidadOperaciones = parseInt(prompt("Ingresa la cantidad de operaciones"));
    const arrayNumeros = convertirArray(cantidadOperaciones);
    const h1multiplicacion = document.getElementById("multiplicacion");

    for (let i = 0; i < cantidadOperaciones; i++) {
        const multiplicando = elegirNumerosAleatorios(tablas);
        const multiplicador = elegirEliminar(arrayNumeros);
        const resultado = multiplicando * multiplicador;
        const multVisual = `${multiplicando} x ${multiplicador}`;

        // Mostrar operación en el DOM
        h1multiplicacion.innerText = multVisual;

        console.log(`Esperando respuesta para: ${multVisual}`);

        // Esperar la respuesta del usuario
        const respuesta = await esperarEnvioFormulario();

        // Validar respuesta
        if (respuesta === resultado) {
            console.log("Respuesta correcta");
        } else {
            console.log(`Respuesta incorrecta. Correcto era ${resultado}`);
        }
    }

    console.log("¡Has completado todas las operaciones!");
}

main();