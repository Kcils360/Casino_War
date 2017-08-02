'use strict';

Card.deck = [];
Card.refresh = [];
Card.color = ['clubs','hearts','spades','diamonds'];
Card.left = 52;
Card.onTable = [];
Player.click = 0;
Player.info = [];
Player.bid = [];
Player.bank = 0;
var dealerHand;
var playerHand;
var randomIndex;


Card.dealerImg = document.getElementById('dealer_img');


Card.war = document.getElementById('war');
Card.section = document.getElementById('imgSection');
Card.input = document.getElementById('form');
document.getElementById('bank').innerHTML = Player.bank;


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
  // Card.onTable = JSON.parse(localStorage.getItem('onTable'));
} else{
  for(var j = 0; j <= 3; j++){
    for(var i = 2; i <= 14; i ++){
      new Card(i,Card.color[j]);
    }
  }
}

if(localStorage.bank || localStorage.bank === ''){
  Player.bank = JSON.parse(localStorage.getItem('bank'));
} else{
  Player.bank = 200;
}

// if(localStorage.gambler || localStorage.gambler === ''){
//
// }



begin();

function begin(){
  dealerHand = randomCard();
  Card.deck.splice(randomIndex,1);
  Card.dealerImg.src = dealerHand.source;
  for(i = 0; i < 5; i++){
    var j = i + 1;
    document.getElementById('card' + j).src = 'img/cardBack.png';
  }
  updateBank();
}



function addBet(e){
  e.preventDefault();
  var chip = e.target.bid.value;
  // if(Card.deck.length == 0){
  //   alert('GAME OVER!');
  //   return;
  // }

  if(isNaN(parseInt(chip))){
    resetInput();
    return alert('MUST BE A NUMBER!');
  }

  if(Player.click > 4){
    resetInput();
    return alert('Max # of card to bet is 5!');
  }
  if(chip > (Player.bank)){
    resetInput();
    return alert('Credit is no good! CASH ONLY!');
  }


  Player.bid.push(parseInt(chip));
  Player.bank -= chip;
  Player.click ++;
  playerHand = randomCard();
  Card.onTable.push(playerHand);
  Card.deck.splice(randomIndex,1);
  resetInput();
  renderTable();
  updateBank();
}


function play(){
  for(var k = 0; k < Card.onTable.length; k++){
    var x = Card.onTable[k];

    if(compare(dealerHand,x)){
      alert('You LOST $' + Player.bid[k] + ' on card #' + (k + 1));
    } else if(compare(x,dealerHand)){
      Player.bank += (2 * Player.bid[k]);
      alert('You WON $' + Player.bid[k] + ' on card #' + (k + 1));
      updateBank();
    }

    while(dealerHand.num == x.num){
      if(confirm('You are challenged to go to war on card # ' + (k + 1) )){
        Player.bid[k] *= 2;
        alert('going to war on card #' + (k + 1) + ' Your bet for this card has been raised to: $ ' + Player.bid[k]);
        dealerHand = randomCard();
        Card.deck.splice(dealerHand,1);
        alert('Dealer is now holding a new card');
        Card.dealerImg.src = dealerHand.source;

        Card.onTable[k] = randomCard();
        Card.deck.splice(Card.onTable[k],1);
        renderTable();

        if(compare(dealerHand,x)){
          alert('You LOST $' + Player.bid[k] + ' on card #' + (k + 1));
        } else if(compare(x,dealerHand)){
          Player.bank += (2 * Player.bid[k]);
          alert('You WON $' + Player.bid[k] + ' on card #' + (k + 1));
          updateBank();
        }
      } else{
        x.num = null;
        alert('You LOST $' + Player.bid[k] + ' by refusing to go to war!');
        updateBank();
      }
    }
  }

  if(Player.bank <= 0){
    alert('GAME OVER !!');
    return;
  }
  // updatePlayer();
  Card.onTable = [];
  Player.bid = [];
  Player.click = 0;
  // begin();
}

function updateBank(){
  document.getElementById('bank').innerHTML = Player.bank;
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


function updatePlayer(){
  localStorage.setItem('deck',JSON.stringify(Card.deck));
  localStorage.setItem('bank',JSON.stringify(Player.bank));
  // localStorage.setItem('onTable',JSON.stringify(Card.onTable));
}

function resetInput(){
  Card.input.reset();
}


Card.input.addEventListener('submit',addBet);
// Card.input.addEventListener('click',play);
// document.getElementById('restart').addEventListener('submit',restart);
