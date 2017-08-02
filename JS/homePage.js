'use strict';


function initiateGame(e){
  e.preventDefault();
  var username = document.getElementById('username').value;
  var betAmount = document.getElementById('betAmount').value;
  console.log(username, ' bet ', betAmount);

  localStorage.setItem('gambler',username);
  localStorage.setItem('bank', betAmount);
}




document.getElementById('play').addEventListener('click', initiateGame);
