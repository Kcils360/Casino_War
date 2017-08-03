'use strict';

var userName = localStorage.gambler;

function saveBet(e){
  e.preventDefault();

  var deckNum = document.getElementById('deckNum').value;
  localStorage.setItem('deckNum', parseInt(deckNum));

}

document.getElementById('play').addEventListener('click', saveBet);
