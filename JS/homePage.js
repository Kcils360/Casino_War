'use strict';

localStorage.clear();
function saveName(e){
  e.preventDefault();
  var username = document.getElementById('username').value;
  localStorage.setItem('gambler', username);
}
document.getElementById('continue').addEventListener('click', saveName);
