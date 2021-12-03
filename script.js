'use strict';

// selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

let scores, currentScore, activePlayer, playing

const init = function () {
    //starting state
    scores = [0, 0]
    currentScore = 0
    activePlayer = 0
    playing = true
    scores[0] = 0
    scores[1] = 0
    score0El.textContent =`${0}`
    score1El.textContent =`${0}`
    current0El.textContent =`${0}`
    current1El.textContent =`${0}`
    diceEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
}
init()
const updatePlayerScore = function (player, score) {
    document.getElementById(`score--${player}`).textContent = `${score}`
}
const updatePlayerCurrentScore = function (player, score) {
    document.getElementById(`current--${player}`).textContent = `${score}`
}
const nullCurrentScore = function () {
    currentScore = 0
    updatePlayerCurrentScore(activePlayer, currentScore)
}
const switchPlayer = function () {
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}
const winner = function () {
    playing = false
    document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
    updatePlayerScore(activePlayer, scores[activePlayer])
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
    diceEl.classList.add('hidden')
}
//dice-roll
const rollDice = function () {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`
        if (dice !== 1) {
            currentScore += dice;
            updatePlayerCurrentScore(activePlayer, currentScore)
        } else {
            nullCurrentScore()
            switchPlayer()
        }
    }
}
//hold
const hold = function () {
    if (playing) {
        scores[activePlayer] += currentScore;
        updatePlayerScore(activePlayer, scores[activePlayer])
        nullCurrentScore()
        if (scores[activePlayer] >= 100) {
            winner()
        } else {
            switchPlayer()
        }
    }
}

btnRoll.addEventListener('click', rollDice)
btnHold.addEventListener('click', hold)
btnNew.addEventListener('click', init)
