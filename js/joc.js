const nomObj = document.getElementById("jugadorActual");
const nomCookie = document.cookie.split("=")[1];
const gridContainer = document.getElementById("grid-container");
const puntosActualesObj = document.getElementById("puntosActuales");
const mejorJugadorObj = document.getElementById("mejorJugador");
const mejorPuntuacionObj = document.getElementById("mejorPuntuacion");
const broadcastChannel = new BroadcastChannel("canal_punts");   //Declaro broadcastChannel

nomObj.textContent = nomCookie; // Muestra el nombre del jugador en pantalla a traves de la cookie
let puntosActuales = 0;

let mejorPuntuacion = localStorage.getItem("mejorPuntuacion") || 0;
let mejorJugador = localStorage.getItem("mejorJugador") || "Ninguno";

// Muestra la mejor puntuación y el mejor jugador
mejorPuntuacionObj.textContent = mejorPuntuacion;
mejorJugadorObj.textContent = mejorJugador;

const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const letterPairs = [...letters, ...letters].sort(() => 0.5 - Math.random()); // Mezcla aleatoria

let parejasEncontradas = 0;
let finestraFinal;
let estatPartida = "En Joc";
let firstSelection = null;
let secondSelection = null;
let colorFondo = sessionStorage.getItem("colorFondo");

// Detecta el navegador y establece el color de fondo
if (!colorFondo) {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes("firefox")) {
        colorFondo = "orange";
    } else if (userAgent.includes("chrome")) {
        colorFondo = "green";
    } else {
        colorFondo = "gray";
    }
    sessionStorage.setItem("colorFondo", colorFondo); // Guarda el color en sessionStorage
}

document.body.style.backgroundColor = colorFondo;

// Muestra la ventana de instrucciones
document.getElementById("instruccions").addEventListener("click", () => {
    window.open("instruccions.html", "Instruccions", "width=400,height=400");
});

// Actualiza el puntaje actual en pantalla
function actualizarPuntuacion() {
    puntosActualesObj.textContent = puntosActuales;
}

// Actualiza la mejor puntuación si es necesario
function actualizarMejorPuntuacion() {
    if (puntosActuales > mejorPuntuacion) {
        mejorPuntuacion = puntosActuales;
        mejorJugador = nomCookie;

        localStorage.setItem("mejorPuntuacion", mejorPuntuacion);
        localStorage.setItem("mejorJugador", mejorJugador);

        mejorPuntuacionObj.textContent = mejorPuntuacion;
        mejorJugadorObj.textContent = mejorJugador;
    }
}

// Genera los botones de las cartas y realiza las funciones
letterPairs.forEach(letter => {
    const button = document.createElement("button");
    button.classList.add("blue-button");
    button.dataset.letter = letter;
    button.textContent = "";
    button.disabled = false;

    button.addEventListener("click", () => {
        if (firstSelection && secondSelection) return;

        button.textContent = letter;
        button.style.backgroundColor = "gray";
        button.disabled = true;

        if (!firstSelection) {
            firstSelection = button;
        } else {
            secondSelection = button;

            if (firstSelection.dataset.letter === secondSelection.dataset.letter) {
                //Aumenta puntos y cambia el color a verde
                puntosActuales += 10;
                firstSelection.style.backgroundColor = "#00cc00";
                secondSelection.style.backgroundColor = "#00cc00";
                firstSelection = null;
                secondSelection = null;
                parejasEncontradas++;

                // Si se encuentran todas las parejas, acaba el juego
                if (parejasEncontradas === 10){
                    estatPartida = "Finalitzat";
                    finestraFinal = window.open("final.html"); // Abre página final
                } 
            } else {
                // Si falla, reduce puntos y resetea las cartas después de un tiempo
                puntosActuales -= 3;
                
                if (puntosActuales < 0){
                    puntosActuales = 0;
                }
                
                setTimeout(() => {
                    firstSelection.textContent = "";
                    secondSelection.textContent = "";
                    firstSelection.style.backgroundColor = '#007bff';
                    secondSelection.style.backgroundColor = '#007bff';
                    firstSelection.disabled = false;
                    secondSelection.disabled = false;
                    firstSelection = null;
                    secondSelection = null;
                }, 1000);
            }
            broadcastChannel.postMessage("Jugador: " + nomCookie + " Punts: " + puntosActuales + " ESTAT PARTIDA: " + estatPartida);

            actualizarPuntuacion();
            actualizarMejorPuntuacion();
        }
    });

    gridContainer.appendChild(button); // Añade el botón al div
});

actualizarPuntuacion();
