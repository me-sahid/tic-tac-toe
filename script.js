
const gameFrame = document.querySelector(".gameBox");
const gameboxes = document.querySelectorAll(".box");
const statusText = document.querySelector(".statusText")
const restartGame = document.querySelector("#restartGame");
const gameCondition  = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let optionsofeachCell = ["", "", "","", "","", "","", "",];
let currentplayer = "X";
let running = false;

gameLoader();

function gameLoader() {
    gameboxes.forEach(cell => cell.addEventListener("click", checkifcellClicked));
    restartGame.addEventListener("click", gameRestart);
    statusText.textContent = `${currentplayer}'s Turn`

    running = true;
}

function checkifcellClicked() {
    const cellindex = this.getAttribute("cellindex");

    if(optionsofeachCell [cellindex] != "" || !running){
        return;
    }

    updateGame(this, cellindex);
    // changeplayerafterGamereq ();
    choosegameWinner();
}

function updateGame(cell, index){
    optionsofeachCell[index] = currentplayer;
    cell.textContent = currentplayer; 

};

function changeplayerafterGamereq (){
    currentplayer = (currentplayer == "X") ? "O": "X";
    statusText.textContent = `${currentplayer}'s Turn`;

};

function choosegameWinner (){
    let roundWinner = false;

    for(i = 0; i < gameCondition.length; i++){
        const gameindex = gameCondition[i];
        const boxA = optionsofeachCell[gameindex[0]];
        const boxB = optionsofeachCell[gameindex[1]];
        const boxC = optionsofeachCell[gameindex[2]];

        if(boxA == "" || boxB == "" || boxC == ""){
            continue;

        }
        if(boxA == boxB && boxB == boxC){
            roundWinner = true;
            break;
        }

    }
    if(roundWinner){
        statusText.textContent = `${currentplayer} Won`
        running = false;
    }

    else if(!optionsofeachCell.includes("")){
        statusText.textContent = "Draw"
        running = false;
    }
    else{
        changeplayerafterGamereq();
    }

};

function gameRestart() {
    currentplayer = "X";
    optionsofeachCell =["", "", "","", "","", "","", "",];
    gameboxes.forEach(cell => cell.textContent = "");
    statusText.textContent = `${currentplayer}'s Turn`
    running = true
    
};



