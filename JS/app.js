'use strict';

Card.deck = [];
Card.refresh = [];
Card.color = ['clubs','hearts','spades','diamonds'];
Card.left = 52;
Card.onTable = [];
Card.order = ['2','3','4','5','6','7','8','9','10','jack','queen','king','ace'];
Player.click = 0;
Player.bid = [];
Player.bank = 0;
var cheapItem = ['tshirt','t-shirt','cloth','pen','waterbottle','wallet','headphone','earphone'];
var valueItem = ['laptop','watch','ring','earing','iphone','macbook','phone'];
var gambler;
var dealerHand;
var playerHand;
var randomIndex;


Card.dealerImg = document.getElementById('dealer_img');
Card.war = document.getElementById('war');
Card.section = document.getElementById('imgSection');
Card.input = document.getElementById('form');


function Card(num,color){
  this.num = num;
  this.color = color;
  this.source = 'img/PNG-cards-1.3/' + this.num + '_of' + '_' + this.color + '.png';
  Card.deck.push(this);
}

function Player(name){
  this.name = name;
}

function getLocal(){
  Card.deck = [];

  if(localStorage.deck || localStorage.deck === ''){
    Card.deck = JSON.parse(localStorage.getItem('deck'));
  } else{
    if(localStorage.deckNum || localStorage.deckNum === ''){
      for(var d = 0; d < parseInt(localStorage.getItem('deckNum')); d++){
        makeDeck();
      }
      localStorage.removeItem('deckNum');
    } else{
      makeDeck();
    }
  }

  if(localStorage.bank || localStorage.bank === ''){
    Player.bank = parseInt(localStorage.getItem('bank'));
  } else{
    Player.bank = 200;
  }
  updateBank();
}
(function getName(){
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
// if(localStorage.gambler.length < 1){
//   gambler = 'Guest';
// }else {
//   document.getElementById('gambler').textContent = gambler;
// }
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  if(localStorage.gambler.length > 0){
    gambler = localStorage.getItem('gambler');
  } else{
    gambler = 'Guest Player';
    updateName();
  }
  document.getElementById('gambler').innerHTML = gambler;
})();


function begin(){
  dealerHand = randomCard();

  while(dealerHand.num < 5){
    dealerHand = randomCard();
  }
  Card.deck.splice(randomIndex,1);
  Card.dealerImg.src = 'img/cardBack.png';
  for(var i = 0; i < 5; i++){
    var j = i + 1;
    document.getElementById('card' + j).src = 'img/cardBack.png';
    document.getElementById('b' + i).innerHTML = 'Card #: ' + j;
  }
  updateBank();
}



function addBet(e){
  e.preventDefault();
  var chip = e.target.bid.value;
  if(Card.deck.length == 0){
    alert('Ran out of card, shuffle to restart!');
    return;
  }

  if(isNaN(parseInt(chip))){
    resetInput();
    return alert('MUST BE A NUMBER!');
  }

  if(parseInt(chip) < 20){
    return alert('Minimum bet is $20!');
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

  for(var i = 0; i < Player.bid.length; i++){
    document.getElementById('b' + i).innerHTML = 'Bid: $' + Player.bid[i];
  }

  Player.bank -= chip;
  Player.click ++;
  playerHand = randomCard();
  Card.onTable.push(playerHand);
  Card.deck.splice(randomIndex,1);
  resetInput();
  renderTable();
  updateBank();
  updateDeck();
}


function play(){
  Card.dealerImg.src = dealerHand.source;
  setTimeout(function() {
    alert('Dealer has shown his card!');

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
        var war = prompt('You are challenged to go to war on card # ' + (k + 1) + '. Would you like to go to war?' ).toLowerCase();
        while(!(war == 'y' || war == 'yes' || war == 'n' || war == 'no')){
          alert('yes or no only!');
          war = prompt('One more chance, yes or no?');
        }

        if(war == 'y' || war == 'yes'){
          Player.bid[k] *= 2;
          alert('going to war on card #' + (k + 1) + '. Your bet for this card has been raised to: $ ' + Player.bid[k]);
          dealerHand = randomCard();
          Card.deck.splice(dealerHand,1);
          updateDeck();
          alert('Dealer is now holding a new card: ' + Card.order[(dealerHand.num) - 2] + ' of ' + dealerHand.color);
          Card.dealerImg.src = dealerHand.source;
          Card.onTable[k] = randomCard();
          Card.deck.splice(Card.onTable[k],1);
          alert('You are now holding a new card: ' + Card.order[(Card.onTable[k].num) - 2] + ' of ' + Card.onTable[k].color);
          updateDeck();
          renderTable();

          if(compare(dealerHand,Card.onTable[k])){
            alert('You LOST $' + Player.bid[k] + ' on card #' + (k + 1));
          } else if(compare(Card.onTable[k],dealerHand)){
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
      alert('Looks like you are out of money!');
      var pawn = prompt('Would you like to pawn a personel item of yours for money?').toLowerCase();
      while(!(pawn == 'y' || pawn == 'yes' || pawn == 'n' || pawn == 'no')){
        alert('yes or no only!');
        pawn = prompt('One more chance, yes or no?').toLowerCase();
      }
      if(pawn == 'y' || pawn == 'yes'){
        pawnShop();
      } else{
        return alert('You just got kick out of the Casino!');
      }
    }

    Card.onTable = [];
    Player.bid = [];
    Player.click = 0;
    setTimeout(function(){
      begin();
    },3000);
  }, 2000);
}


function renderTable(){
  for(var i = 0; i < Card.onTable.length; i++){
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

function pawnShop(){
  var pawnItem = prompt('Great! What do you have on you to pawn?').toLowerCase();
  for(var p = 0; p < valueItem.length; p++){
    if(pawnItem == valueItem[p]){
      Player.bank = randomInt(50,100);
      return alert('After estimating your ' + pawnItem + ' is worth $' + Player.bank);
    } else if(pawnItem == cheapItem[p]){
      Player.bank = randomInt(2,5);
      return alert('After estimating your ' + pawnItem + ' is worth $' + Player.bank);
    } else{
      Player.bank = randomInt(5,10);
      return alert('After estimating your ' + pawnItem + ' is worth $' + Player.bank);
    }
  }
}


function randomInt(min,max)
{
  return (Math.floor(Math.random() * (max - min + 1) + min)) * 10;
}


function randomCard(){
  randomIndex = Math.floor(Math.random() * Card.deck.length);
  return Card.deck[randomIndex];
}

function updateBank(){
  document.getElementById('bank').innerHTML = '$' + Player.bank;
  localStorage.setItem('bank',JSON.stringify(Player.bank));
}

function updateName(){
  document.getElementById('gambler').innerHTML = gambler;
  localStorage.setItem('gambler',JSON.stringify(gambler));
}


function updateDeck(){
  localStorage.setItem('deck',JSON.stringify(Card.deck));
}


function reset(){
  localStorage.removeItem('deck');
  getLocal();
  begin();
}

function resetInput(){
  Card.input.reset();
}




function makeDeck(){
  for(var j = 0; j <= 3; j++){
    for(var i = 2; i <= 14; i ++){
      new Card(i,Card.color[j]);
    }
  }
  updateDeck();
}

getLocal();
begin();


document.getElementById('bank').innerHTML = Player.bank;
document.getElementById('gambler').innerHTML = gambler;
Card.input.addEventListener('submit',addBet);
