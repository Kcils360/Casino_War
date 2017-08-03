'use strict';

localStorage.clear();
var username;
var input;

function saveName(e){
  e.preventDefault();
  input = document.getElementById('username').value;
}

if(typeof(input) == 'undefined' ){
  username = 'Guest Player';
}

localStorage.setItem('gambler', username);
document.getElementById('continue').addEventListener('click', saveName);
