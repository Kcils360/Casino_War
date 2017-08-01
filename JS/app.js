'use strict';

Card.deck = [];
Card.refresh = [];
Card.color = ['clubs','hearts','spades','diamonds'];
Card.left = 52;
Player.info = [];
Player.bid = 0;
Player.bank = 200;
var dealerHand;
var playerHand;
var randomIndex;

// Card.dealerImg = document.getElementById('dealer_img');
Card.playerImg = document.getElementById('player_img');
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
  updatePlayer();

} else{
  for(var j = 0; j < 4; j++){
    for(var i = 2; i < 15; i ++){
      new Card(i,Card.color[j]);
    }
  }
}

function play(e){
  e.preventDefault();
  document.getElementById('flip_container').style.webkitTransition = '.flip';

  if(Card.deck.length == 0){
    alert('GAME OVER!');
    return;
  }

  Player.bid = parseInt(e.target.bid.value);
  renderTable();

  while(dealerHand.num == playerHand.num){
    Player.bid = Player.bid * 2;
    alert('going to war! Your bid is now ' + Player.bid);
    renderTable();
  }

  if(compare(dealerHand,playerHand)){
    Player.bank += Player.bid;
  } else{
    Player.bank -= Player.bid;
  }

  Player.bid = 0;
  updatePlayer();
  document.getElementById('bank').innerHTML = Player.bank;


  if(Player.bank <= 0){
    alert('GAME OVER !!');
    return;
  }

}


function renderTable(){
  dealerHand = randomCard();
  Card.deck.splice(randomIndex,1);

  playerHand = randomCard();
  Card.deck.splice(randomIndex,1);

  Card.playerImg.src = playerHand.source;
  Card.dealerImg.src = dealerHand.source;

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



function updatePlayer(){
  localStorage.setItem('deck',JSON.stringify(Card.deck));
  localStorage.setItem('bank',JSON.stringify(Player.bank));
}



Card.input.addEventListener('submit',play);
// document.getElementById('restart').addEventListener('submit',restart);
//++++++++++++++++++++++++++++++card flip on button press+++++++++++++++++++++
