'use strict';

var userName = localStorage.gambler;

function saveBet(e){
  e.preventDefault();
}

document.getElementById('play').addEventListener('click', saveBet);
var betAmount = document.getElementById('betAmount').value;
localStorage.setItem('deckNum', parseInt(betAmount));
