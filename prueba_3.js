function convertirArray(rango) {
    let numeros = Array.from({ length: rango }, (_, i) => i + 1);
    return numeros
}   

function elegirEliminar(numeros){
    let indiceAleatorio = Math.floor(Math.random() * numeros.length);
    let numeroSeleccionado = numeros.splice(indiceAleatorio, 1)[0];

    return numeroSeleccionado
}

// Ejemplo de uso
let numeroMaximo = parseInt(prompt("Ingresa el número máximo:"));
let arrayNumeros = convertirArray(numeroMaximo)

for (i=0; i<numeroMaximo; i++){
    console.log((i+1) + '. ' + elegirEliminar(arrayNumeros));
}


