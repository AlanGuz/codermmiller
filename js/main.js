//const ahora = new Date();

//console.log(ahora.getTime());



//para pasar el resultado a dias debo multiplicar en cadena horaria.



//nombre

const nombre = prompt("¡Hola! ¿Cómo te llamas?");


//cumpleaños


function calculardiasparacumple (fechaobjetivo){

    const fechaactual = new Date();
    const fechacumple = new Date("2026-01-19");
    const diferenciafechas = fechacumple - fechaactual;

    if (diferenciafechas <= 0) {

        alert("¡Ya hemos pasado su cumpleaños!");
        return;
    }


    const diasrestantes = Math.floor(diferenciafechas / (1000 * 60 * 60 * 24));
    alert(`Faltan ${diasrestantes} dias para su proximo cumpleaños.`);
}

const contar = document.getElementById("btncontador");

contar.addEventListener("click", () => {
calculardiasparacumple("2026-01-19");
});




//canciones

function recomendarcancion() {
    const canciones = [
    "Dunno",
    "Good News",
    "Hand Me Downs",
    "Best Day Ever",
    "Objects In The Mirror",
    "Caminos de Fuego",
    "Come Back to Earth",
    "Blue World",
    "Diablo"
    ];

    const sensaciones = prompt("¡Hola! ¿Cómo te sientes hoy?");

    if (sensaciones) {
    const cancionaleatoria = canciones[Math.floor(Math.random() * canciones.length)];
    alert(`${nombre}, tu canción recomendada para hoy es: 🎶 "${cancionaleatoria}"`);
    } else {
    alert("Disculpa, no recibí respuesta");
    }
}

const cancion = document.getElementById("btncancion");

cancion.addEventListener("click", recomendarcancion);


//