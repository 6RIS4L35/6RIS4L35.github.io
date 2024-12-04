function elegirNumerosAleatorios(numeros) {
    let copiaNumeros = [...numeros];
    let indiceAleatorio = Math.floor(Math.random() * copiaNumeros.length);
    numeroAleatorio = copiaNumeros[indiceAleatorio];
    return numeroAleatorio
}

const numerosIngresados = [10];
for (let i = 0; i < 11; i++) {
    console.log((i +1) + '. ' + elegirNumerosAleatorios(numerosIngresados));
}
