function Hand() {
	var hand = [];
	var newHand = [];
	var that=this;
	
	
	this.addCard = function(card){
    hand.push(card);
  }
	
  
	this.getCard = function(position) {
    if (position < 0 || position >= hand.length){
			alert('wrong card see code');
		}
		return hand[position];
  }
	
	
	this.getPosition = function(card){
		var index = hand.indexOf(card);
		return index;
	}
	
	
	this.removePlayerCard = function(card){
		var index = hand.indexOf(card);
		hand[index] = null;
	}
	
	
	this.getCardCount = function() {
    return hand.length;
  }
   
	
	this.sortByValue = function() {
    while (hand.length > 0) {
      var pos = 0;  // Position of minimal card.
      var c = hand[0];  // Minimal card.
      for (var i = 1; i < hand.length; i++) {
        var c1 = hand[i];
      
				if (c1.getSuit() < c.getSuit() || (c1.getSuit() == c.getSuit() && c1.getValue() < c.getValue()) ) {
          pos = i;
          c = c1;
        }
      }
			hand.splice(pos, 1);
			newHand.push(c);
		} 
		hand = newHand;
  }
}