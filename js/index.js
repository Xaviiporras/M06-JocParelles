const comenzarPartidaBtn = document.getElementById("comenzarPartida");
const borrarPartidaBtn = document.getElementById("borrarPartida");
const nameInput = document.getElementById("InputName");
const infoNavegadorObj = document.getElementById("infoNavegador");
const infoURLObj = document.getElementById("infoURL");


comenzarPartidaBtn.addEventListener("click", comenzarPartida);
borrarPartidaBtn.addEventListener("click", borrarPartida);

let finestra;

function comenzarPartida(){
    if(nameInput.value){
        finestra = window.open("joc.html");
        localStorage.setItem("nom", nameInput.value);
    }else{
        alert("Has d'introduir el nom de jugador");
    }
}


function borrarPartida(){
    finestra.close();
}

function infoNavegador(){
    infoNavegadorObj.textContent = navigator.userAgent
}

infoNavegador();

function infoURL(){
    infoURLObj.textContent = location.href
}

infoURL();