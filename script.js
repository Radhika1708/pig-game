'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
// instead of above, we can also do
const score1El = document.getElementById('score--1'); //😀
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden'); // hiding the dice

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true; // are we still playing the game?

const switchPlayer = function () {
  // display 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0; //⭐
  // change player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // set the current score to zero
  currentScore = 0;
  // it's because of the player--active class, white background is being displayed,
  // we need to keep switching that by adding/ removing that class
  player0El.classList.toggle('player--active'); //⭐ what toggle will do is, that it will add the class, if it is not there and vice-versa
  player1El.classList.toggle('player--active');
};
//---------------------------------- Rolling dice functionality --> should be executed only if we are still playing

btnRoll.addEventListener('click', function () {
  // 1. Generate a random dice roll
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; // to generate numbers from 1 to 6

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // ⭐through this, we can dynamically load on of these 6 images

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      // below- dynamically displaying the current score, based on the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// ------------------------------Hold functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // Here we will need score array
    // 1.Add current score to the score of the active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if score is already atleast 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden'); // remove dice
      // Finish game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player --- using function
      switchPlayer();
    }
  }
});

// ---------------------------------New game functionality
btnNew.addEventListener('click', function () {
  // my way
  document.querySelector(`.player--0`).classList.add('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  diceEl.classList.add('hidden');
  document.getElementById(`score--0`).textContent = scores[0];
  document.getElementById(`score--1`).textContent = scores[1];
});
