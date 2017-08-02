'use strict';

Card.deck = [];
Card.refresh = [];
Card.color = ['clubs','hearts','spades','diamonds'];
Card.left = 52;
Card.onTable = [];
Player.click = 0;
Player.info = [];
Player.bid = [];
Player.bank = 200;
var dealerHand;
var playerHand;
var randomIndex;


Card.dealerImg = document.getElementById('dealer_img');
// Card.one = document.getElementById('card1');
// Card.two = document.getElementById('card2');
// Card.three = document.getElementById('card3');
// Card.four = document.getElementById('card4');
// Card.five = document.getElementById('card5');



Card.war = document.getElementById('war');
Card.section = document.getElementById('imgSection');
Card.input = document.getElementById('form');
document.getElementById('bank').innerHTML = Player.bank;
new Player('testbot');



function Card(num,color){
  this.num = num;
  this.color = color;
  this.source = 'img/PNG-cards-1.3/' + this.num + '_of' + '_' + this.color + '.png';
  Card.deck.push(this);
}

function Player(name){
  this.name = name;
  Player.info.push(this);
}


if(localStorage.deck || localStorage.deck === ''){

  Card.deck = JSON.parse(localStorage.getItem('deck'));
  Player.bank = JSON.parse(localStorage.getItem('bank'));
  // updatePlayer();

} else{
  for(var j = 0; j < 4; j++){
    for(var i = 2; i < 15; i ++){
      new Card(i,Card.color[j]);
    }
  }
}

begin();

function begin(){
  dealerHand = randomCard();
  Card.deck.splice(randomIndex,1);
  Card.dealerImg.src = dealerHand.source;
  for(i = 0; i < 5; i++){
    var j = i + 1;
    document.getElementById('card' + j).src = 'img/cardBack.png';
  }
}



function addBet(e){
  e.preventDefault();
  // if(Card.deck.length == 0){
  //   alert('GAME OVER!');
  //   return;
  // }

  Player.bid.push(parseInt(e.target.bid.value));
  playerHand = randomCard();
  Card.onTable.push(playerHand);
  Card.deck.splice(randomIndex,1);
  renderTable();
}


function play(){
  for(i = 0; i < Card.onTable.length; i++){
    while(dealerHand.num == Card.onTable[i].num){
      alert('going to war on card #' + (i + 1));
      var newCard = randomCard();
      Card.deck.splice(newCard,1);
      Card.onTable[i] = newCard;
      renderTable();
      // return;
    }

    if(compare(dealerHand,Card.onTable[i])){
      Player.bank -= Player.bid[i];
      alert('You LOST $' + Player.bid[i] + ' on card #' + (i + 1));
    } else{
      Player.bank += Player.bid[i];
      alert('You WON $' + Player.bid[i] + ' on card #' + (i + 1));

    }
    document.getElementById('bank').innerHTML = Player.bank;
  }

  if(Player.bank <= 0){
    alert('GAME OVER !!');
    return;
  }

  // updatePlayer();
  Card.onTable = [];
  Player.bid = [];
  begin();

}


function renderTable(){
  for(i = 0; i < Card.onTable.length; i++){
    var j = i + 1;
    document.getElementById('card' + j).src = Card.onTable[i].source;
  }
}

function compare(card1,card2){
  if(card1.num > card2.num){
    return true;
  }
  return false;
}


function randomCard(){
  randomIndex = Math.floor(Math.random() * Card.deck.length);
  return Card.deck[randomIndex];
}


// function updatePlayer(){
//   localStorage.setItem('deck',JSON.stringify(Card.deck));
//   localStorage.setItem('bank',JSON.stringify(Player.bank));
// }

function cardFlipper() {
  var x = document.getElementById('flip');
  x.classList.toggle("flipped");
}

Card.input.addEventListener('submit',addBet);
// Card.input.addEventListener('click',play);
// document.getElementById('restart').addEventListener('submit',restart);
