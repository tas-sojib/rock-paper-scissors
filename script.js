// Flag to track if the game is over
let gameOver = false;

// Object to map each choice to the choice it defeats
const characterSpec = {
    rock: 'scissors',
    scissors: 'paper',
    paper: 'rock'
};

// DOM elements for displaying choices and results
const playerChoice = document.getElementById("player-choice");
const aiChoice = document.getElementById("computer-choice");
const result = document.getElementById("result");
const playerScoreEl = document.getElementById("player-score");
const aiScoreEl = document.getElementById("ai-score");

// Initialize scores
let playerScore = 0;
let aiScore = 0;

// Function to randomly select the AI's choice
function getAiChoice() {
    const item = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * item.length);
    return item[randomIndex];
}

// Event listener for button clicks
document.body.addEventListener('click', function(e) {
    let click = e.target.id;
    if (click === "rock-btn" || click === "paper-btn" || click === "scissors-btn") {
        if (!gameOver) {
            const playerItem = document.getElementById(click).textContent;
            displayChoice(playerItem);
        }
    }
});

// Function to display the choices of player and AI
function displayChoice(playerItem) {
    playerChoice.textContent = 'Your Choice: ' + playerItem;
    const aiItem = getAiChoice();
    aiChoice.textContent = 'AI Choice: ' + aiItem;
    renderResult(playerItem, aiItem);
}

// Function to determine and display the result of the round
function renderResult(playerItem, aiItem) {
    if (characterSpec[playerItem] === aiItem || characterSpec[aiItem] === playerItem) {
        if (characterSpec[playerItem] === aiItem) {
            playerScore++;
            playerScoreEl.textContent = playerScore;
            result.textContent = 'Result: Player wins';
        } else {
            aiScore++;
            aiScoreEl.textContent = aiScore;
            result.textContent = 'Result: Ai wins';
        }
    } else {
        result.textContent = 'Result: Tie';
    }
    determineWinner();
}

// Function to check if there's a winner and end the game
function determineWinner() {
    if (playerScore === 5 || aiScore === 5) {
        gameOver = true;
        setTimeout(function() {
            if (playerScore === 5) {
                document.body.innerHTML = `<div class='end-game'>
                                               <h2>You win the game</h2>
                                               <button onclick='newGame()' id='new-game'>New Game</button>
                                           </div>`;
            } else {
                document.body.innerHTML = `<div class='end-game'>
                                               <h2>You lost the game</h2>
                                               <button onclick='newGame()' id='new-game'>New Game</button>
                                           </div>`;
            }
        }, 1000);
    }
}

// Function to reload the page and start a new game
function newGame() {
    location.reload();
}
