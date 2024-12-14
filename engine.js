const state = {
    view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    }, 
    // validaçao do tempo de jogo
    actions:{
        timerId:setInterval (randomSquare, 1000),
        countDownTimerId:setInterval( countDown, 1000),
    }
};

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime;

    if (state.values.curretTime <=0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("GAME OVER! O seu resultado foi: " + state.values.result);
        //playSound(videogame);
        function countDown() {
            state.values.curretTime--;
            state.view.timeLeft.textContent = state.values.curretTime;
        
            if (state.values.curretTime <= 0) {
                clearInterval(state.actions.countDownTimerId);
                clearInterval(state.actions.timerId);
                
                // Exibir pontuação final no elemento HTML
                const gameOverElement = document.querySelector("#game-over");
                const finalScoreElement = document.querySelector("#final-score");
                
                finalScoreElement.textContent = state.values.result;
                gameOverElement.style.display = "block";
            }
        }
        
    }
}
//funçao para adicao de som
function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`); // Corrigido com backticks
    audio.volume = 0.4;
    audio.play(); 
    
    // mensagem de erro caso o som nao reproduza
    audio.play().catch((error) => {
        console.error("Erro ao tentar reproduzir o áudio:", error);
    });
}

//funçao para modificaçao de posiçao do inimigo
function randomSquare() {
    state.view.squares. forEach((square)=>{
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}
//funçao para validçao do clique do mouse
function addListenerHitBox () {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++; 
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                

            }    
        });
    });
}

//funçao de inicializaçao do codigo
function initialize () {
    addListenerHitBox();
}

initialize ();
