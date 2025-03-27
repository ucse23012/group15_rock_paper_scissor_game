let score = JSON.parse(localStorage.getItem('score'));
if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  }
}

const handOptions = {
  "rock": "Rock.png",
  "paper": "Paper.png",
  "scissors": "Scissors.png",
}

function pickUserhand(hand) {
  // Hides the current page
  let hands = document.querySelector(".hands");
  hands.style.display = "none";
  // Shows the next page
  let contest = document.querySelector(".contest");
  contest.style.display = "flex";

  // Set the user pick
  document.getElementById("userPickImage").src = handOptions[hand];

  // Call playGame once here
  playGame(hand); 
}

// Update score function
function updatescoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}.`;
}

// Display result and moves
function resultandmoves(playerMove, computerMove, result) {
  document.querySelector('.js-result').innerHTML = `${result}.`;
  // Display the computer's move image
  document.getElementById("computerPickImage").src = handOptions[computerMove];
}

// Function to reset the score
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.setItem('score', JSON.stringify(score)); // Save the reset score to localStorage
  updatescoreElement(); // Update the scoreboard
}

// Function call
updatescoreElement(); // Ensure the score is shown when the page loads

// Player move and result
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  // Check for player's move and determine result
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose!';
    } else if (computerMove === 'paper') {
      result = 'You win!';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win!';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose!';
    }

  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose!';
    } else if (computerMove === 'scissors') {
      result = 'You win!';
    }
  }

  // Update score based on result
  if (result === 'You win!') {
    score.wins += 1;
  } else if (result === 'You lose!') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }

  updatescoreElement(); // Update the scoreboard
  resultandmoves(playerMove, computerMove, result); // Display the result and moves
  localStorage.setItem('score', JSON.stringify(score)); // Store the score in localStorage
}

// Computer move
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

// function play again
function restartGame() {
  // Hide the contest page where the results are displayed
  let contest = document.querySelector(".contest");
  contest.style.display = "none";

  // Show the hands selection page again
  let hands = document.querySelector(".hands");
  hands.style.display = "flex";

  // Reset the result message
  document.querySelector('.js-result').innerHTML = '';
  document.getElementById("computerPickImage").src = ''; 
}

  

