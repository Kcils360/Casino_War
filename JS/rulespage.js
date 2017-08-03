'use strict';

var username = localStorage.gambler;

if(localStorage.gambler.length < 1){
  username = 'Guest';
}else {
  document.getElementById('username').textContent = username;
}


function saveBet(e){
  e.preventDefault();
  var deckNum = document.getElementById('deckNum').value;
  localStorage.setItem('deckNum', parseInt(deckNum));
}


document.getElementById('play').addEventListener('click', saveBet);
