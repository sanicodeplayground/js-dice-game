'use strict';

// Setlecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldScore = document.querySelector('.btn--hold');

// Reset elements to 0 &&
// Starting conditions

let scores;
let currentScore;
let activePlayer;
let playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  diceEl.classList.add('hidden');
  // 2. Remove winner class
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  // 3. Add/remove active player
  player1El.classList.add('player--active');
  player0El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  //Switch to next
  //reset current score to 0
  //  currentScore0.textContent = 0; Manually set 0 of Player 1
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  //change current score for player 2
  player1El.classList.toggle('player--active');
  player0El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRollDice.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const diceRandom = Math.trunc(Math.random() * 6) + 1;

    // 2.Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRandom}.png`;

    // 3. Check for rolled 1
    if (diceRandom !== 1) {
      // Add dice to current score
      currentScore += diceRandom;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore; // This sets current score dinamicly to the active player
      // currentScore0.textContent = currentScore; // This is always setting current score to player 1
    } else {
      switchPlayer();
    }
  }
});

// Hold score button function
btnHoldScore.addEventListener('click', function () {
  if (playing) {
    // total score + current score totalScore += currentScore
    // display the new total score
    // Reset current score to 0
    // Switch to other player

    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // 3. Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // 4. Switch to next player
      switchPlayer();
    }
  }
});

btnNewGame.addEventListener('click', init);
