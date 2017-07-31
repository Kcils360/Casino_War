'use strict';


// var userInfoArray = [];

function initiateGame(e){
  e.preventDefault();
  var username = document.getElementById('username').value;
  var betAmount = document.getElementById('betAmount').value;
  console.log(username, ' bet ', betAmount);
  // userInfoArray.push(username);
  // userInfoArray.push(betAmount);
  localStorage.setItem('username', username);
  localStorage.setItem('betAmount', betAmount);
}










// cartFormArray = JSON.parse(localStorage.userFormInfo);




document.getElementById('play').addEventListener('click', initiateGame);
