const readline = require("readline");

function elegirHastaAgotar(rango) {
    // Creamos un arreglo del 1 al rango
    let numeros = Array.from({ length: rango }, (_, i) => i + 1);

    while (numeros.length > 0) {
        // Elegimos un índice aleatorio
        let indiceAleatorio = Math.floor(Math.random() * numeros.length);

        // Seleccionamos el número y lo eliminamos de la lista
        let numeroSeleccionado = numeros.splice(indiceAleatorio, 1)[0];

        console.log(`Número seleccionado: ${numeroSeleccionado}`);
    }

    console.log("Todos los números han sido seleccionados.");
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Ingresa el número máximo: ", (input) => {
    const numeroMaximo = parseInt(input);
    if (isNaN(numeroMaximo) || numeroMaximo <= 0) {
        console.log("Por favor, ingresa un número válido mayor a 0.");
    } else {
        elegirHastaAgotar(numeroMaximo);
    }
    rl.close();
});