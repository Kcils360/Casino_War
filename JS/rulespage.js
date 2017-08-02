'use strict';

localStorage.clear();
function saveBet(e){
  e.preventDefault();
  var betAmount = document.getElementById('betAmount').value;
  localStorage.setItem('bank', parseInt(betAmount));
}
document.getElementById('play').addEventListener('click', saveBet);
