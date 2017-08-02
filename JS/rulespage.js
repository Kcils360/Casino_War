'use strict';

var userName = localStorage.gambler;

function saveBet(e){
  e.preventDefault();
  var betAmount = document.getElementById('betAmount').value;
  localStorage.setItem('bank', parseInt(betAmount));
}
document.getElementById('play').addEventListener('click', saveBet);

if(userName.length > 0){
  document.getElementById('username').textContent = userName;
}
