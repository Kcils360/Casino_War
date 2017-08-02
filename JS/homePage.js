'use strict';


function initiateGame(e){
  e.preventDefault();
  var username = document.getElementById('username').value;
  var betAmount = document.getElementById('betAmount').value;
  console.log(username, ' bet ', betAmount);
  localStorage.setItem('username', username);
  localStorage.setItem('betAmount', parseInt(betAmount));
};




document.getElementById('play').addEventListener('click', initiateGame);
