const comenzarPartidaBtn = document.getElementById("comenzarPartida");
const borrarPartidaBtn = document.getElementById("borrarPartida");
const nameInput = document.getElementById("InputName");

comenzarPartidaBtn.addEventListener("click", comenzarPartida);
borrarPartidaBtn.addEventListener("click", borrarPartida);


let finestra


function comenzarPartida(){
    if(nameInput.value){
        finestra = window.open()
    }else{
        alert("Has d'introduir el nom de jugador")
    }
}


function borrarPartida(){
    finestra = window.close()
}