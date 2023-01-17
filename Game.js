window.addEventListener("DOMContentLoaded", () => { //Dom content loaded 
    const tiles = Array.from(document.querySelectorAll(".tile")); //Html elements
    const playerDisplay = document.querySelector(".display-player");
    const resetButton = document.querySelector("#reset");
    const announcer = document.querySelector(".announcer");
//Variables
let board = ["", "", "", "", "", "", "", "", ""]; //Array for grid data to be stored
let currentPlayer = "X"; //Player x starts game first
let isGameActive = true; 
//Will announce who has won or if the game resulted in a tie
const PLAYERX_WON = "PLAYERX_WON";
const PlayerO_WON = "PLAYERO_WON";
const TIE = "TIE";

/*Indexes within the board
    [0] [1] [2]
    [3] [4] [5]
    [6] [7] [8]
*/
//Represents the index number to each tile on the tic tac toe board
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//Use a loop to see if we have a winner or not 
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break; 
        }
    }
    if (roundWon) {
        announce(currentPlayer === 'X' ? PLAYERX_WON : PlayerO_WON);
        isGameActive = false;
        return;
    }
    if (!board.includes(''))
        announce(TIE);
};


//Announce winner or end of the game status
const announce = (type) => {
    switch(type){
        case PlayerO_WON:
            announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
            break;
        case PLAYERX_WON:
            announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
        case TIE:
            announcer.innerText = 'Tie';
    }
    announcer.classList.remove('hide');
};

//Function used to ensure players play in empty tiles when it is their turn
const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
    }
    return true;
};

const updateBoard = (index) => {
    board[index] = currentPlayer;
;}

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === "X" ? "O" : "X"; //After current players turn icon will change for new players turn
    playerDisplay.innerText = currentPlayer; //Update current player display 
    playerDisplay.classList.add(`player${currentPlayer}`);
}

const userAction = (tile, index) => { //function will run if user clicks on a tile
    if(isValidAction(tile) && isGameActive) { //Checks if game is still active or in win or tie mode
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`); //current players choice recorded
        updateBoard(index); //board and array will be updated
        handleResultValidation(); //checks if it is a valid action
        changePlayer(); //next players turn 
    }
}

//Function resets board and game status
const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    announcer.classList.add("hide");

    if (currentPlayer === 'O') {
        changePlayer();
    }
    tiles.forEach(tile => {
        tile.innerText = ''
        tile.classList.remove('playerX');
        tile.classList.remove('playerO');
    });
}

//Event listener for index number's for each tile
tiles.forEach( (tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
});

    resetButton.addEventListener("click", resetBoard);
});