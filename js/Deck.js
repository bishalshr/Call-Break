function Deck() {
	var deck = [];
	
	for(var i = 0; i < 52; i++){
		deck[i] = new Card();
	}
	
  var cardsUsed;

  this.newDeck = function() {
    var cardCt = 0; 
    for ( var suit = 1; suit <= 4; suit++ ) {
      for ( var value = 1; value <= 13; value++ ) {
    
				deck[cardCt].setCard(value, suit, value + 13 * (suit-1));
        cardCt++;
      }
    }
    cardsUsed = 0;
  }
	
  this.shuffle = function() {
    for ( var i = deck.length - 1; i > 0; i-- ) {
			var rand = parseInt(Math.random()*(i+1));
      var temp = new Card();
			temp = deck[i];
      deck[i] = deck[rand];
      deck[rand] = temp;
    }
    cardsUsed = 0;
	}
	
	this.cardsLeft = function() {
    return deck.length - cardsUsed;
  }
	
	this.dealCard = function() {
    if (cardsUsed == deck.length)
      alert('no card left');
    cardsUsed++;
    return deck[cardsUsed - 1];
      
     }
}    