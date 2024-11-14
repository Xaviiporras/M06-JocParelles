const comenzarPartidaBtn = document.getElementById("comenzarPartida");
const borrarPartidaBtn = document.getElementById("borrarPartida");
const nameInput = document.getElementById("InputName");
const infoNavegadorObj = document.getElementById("infoNavegador");
const infoURLObj = document.getElementById("infoURL");
const broadcastChannelObj = document.getElementById("broadcastChannelObj");
const broadcastChannel = new BroadcastChannel("canal_punts");

let finestra;
let partidaEnCurso = false;

// Añade eventos a los botones
comenzarPartidaBtn.addEventListener("click", comenzarPartida);
borrarPartidaBtn.addEventListener("click", borrarPartida);

// Inicia una partida nueva
function comenzarPartida() {
    if (partidaEnCurso) { // Evitar iniciar otra partida si ya hay una en curso
        alert("Ya hay una partida iniciada. Por favor, borra la partida actual antes de comenzar una nueva.");
        return;
    }

    if (nameInput.value) { // Verifica si se ha introducido un nombre
        finestra = window.open("joc.html"); // Abre la ventana del juego
        document.cookie = "nombreJugador=" + nameInput.value; // Guarda el nombre en una cookie
        partidaEnCurso = true;
    } else {
        alert("Has de introducir el nombre de jugador");
    }
}

// Borra la partida actual
function borrarPartida() {
    if (finestra) {
        finestra.close(); // Cierra la ventana del juego
        partidaEnCurso = false; // Marca que no hay partida activa
        // Elimina la cookie del nombre del jugador
        document.cookie = "nombreJugador=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        broadcastChannelObj.textContent = "No hi ha cap partida en joc";
    }
}

// Muestra información del navegador
function infoNavegador() {
    infoNavegadorObj.textContent = navigator.userAgent;
}
infoNavegador();

// Muestra la URL actual
function infoURL() {
    infoURLObj.textContent = location.href;
}
infoURL();

// Recibe mensaje de broadcastChannel
broadcastChannel.onmessage = (event) => {
    broadcastChannelObj.textContent = event.data;
};
