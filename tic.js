const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset');
const resultPopup = document.getElementById('result-popup');
const resultMessage = document.getElementById('result-message');
const playAgainButton = document.getElementById('play-again');
const modeSelection = document.getElementById('mode-selection');
const playWithAIButton = document.getElementById('play-with-ai');
const playTwoPlayersButton = document.getElementById('play-two-players');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let isAIEnabled = false; 

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

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (boardState[index] === '' && gameActive) {
        makeMove(index);

        if (isAIEnabled && gameActive && currentPlayer === 'O') {
            setTimeout(makeAIMove, 500); 
        }
    }
}

function makeMove(index) {
    boardState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function makeAIMove() {
    let availableMoves = boardState.map((value, index) => value === '' ? index : null).filter(index => index !== null);

    if (availableMoves.length > 0) {
        const randomIndex = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        makeMove(randomIndex);
    }
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        displayResult(`${currentPlayer} has won!`);
        gameActive = false;
    } else if (!boardState.includes('')) {
        displayResult("It's a draw!");
        gameActive = false;
    }
}

function displayResult(message) {
    resultMessage.textContent = message;
    resultPopup.classList.remove('hidden');
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = 'X';
    gameActive = true;
    resultPopup.classList.add('hidden');
    board.classList.add('hidden');
    modeSelection.classList.remove('hidden'); 
}

function startGame(aiMode) {
    isAIEnabled = aiMode;
    modeSelection.classList.add('hidden');
    board.classList.remove('hidden');
    resetGame();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
playAgainButton.addEventListener('click', resetGame);
playWithAIButton.addEventListener('click', () => startGame(true));
playTwoPlayersButton.addEventListener('click', () => startGame(false));
