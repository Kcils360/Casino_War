'use strict';


Card.deck = [];
Card.color = ['clubs','hearts','spades','diamonds'];





function Card(num,color){
  this.num = num;
  this.color = color;
  this.source = 'image/' + this.num + '_of' + '_' + this.color + '.png';
  Card.deck.push(this);
}





for(var j = 0; j < 4; j++){
  for(var i = 2; i < 15; i ++){
    new Card(i,Card.color[j]);
  }
}
