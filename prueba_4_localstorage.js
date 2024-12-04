// Función que devuelve una Promesa que se resuelve al enviar el formulario
function esperarEnvioFormulario(formulario) {
    return new Promise((resolve) => {
        formulario.addEventListener('submit', function(event) {
            // Evitar el comportamiento predeterminado
            event.preventDefault();

            // Capturar datos del formulario
            const datos = {
                nombre: document.getElementById('nombre').value
            };

            // Resolver la Promesa con los datos
            resolve(datos);
        });
    });
}

async function main() {
    const formulario = document.getElementById('miFormulario');

    console.log("Esperando que se envíe el formulario...");

    // Esperar hasta que se envíe el formulario
    const datos = await esperarEnvioFormulario(formulario);

    console.log("Formulario enviado:");
    console.log(datos);

    // Continuar con el resto del programa
    console.log("Continuando con la ejecución...");
}

// Llamar a la función principal
main();
