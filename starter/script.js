'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playing = true;
let currentScore = 0;
let activePlayer = 0;
const scores = [0, 0];
//Starting Conditions
score0.textContent = 0;
score1.textContent = 0;
diceEl.classList.add('hidden');

//function to switch player
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//rolling dice functionality
rollBtn.addEventListener('click', function () {
  if (playing) {
    const diceRoll = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${diceRoll}.png`;
    diceEl.classList.remove('hidden');
    if (diceRoll !== 1) {
      // Add dice to current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

//holding the score
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    //display score
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      //Finish Game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  playing = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById(`score--${0}`).textContent = scores[0];
  document.getElementById(`current--${0}`).textContent = scores[0];

  document.getElementById(`score--${1}`).textContent = scores[1];
  document.getElementById(`current--${1}`).textContent = scores[1];
  player1El.classList.toggle('player--active');

  currentScore = 0;
  player0El.classList.add('player--active');
  activePlayer = 0;
  diceEl.classList.add('hidden');
  player1El.classList.remove('player--active');
});
