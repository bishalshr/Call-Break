function Hand(i) {
	
  var hand = [], newHand = [], playerNum = i, id;
	var playerBox = document.getElementsByClassName('small-box')[i];
  var x = 0;
	var y = 0;
	var that=this;
	
	this.clear = function() {
      hand = [];
   }
   
  this.addCard = function(card) {
    hand.push(card);
  }
   
  this.removeCard = function(card) {
    var index = hand.indexOf(card);
		hand.splice(index,1);
  }
   
  this.removeCard = function(position) {
    if (position < 0 || position >= hand.length)
			alert('wrong card thrown see code');
		
		hand.splice(position,1);
  }

  this.getCardCount = function() {
      return hand.length;
  }
   
   
  this.getCard = function(position) {
    if (position < 0 || position >= hand.length)
			alert('wrong card see code');
  
		return hand[position];
  }
	
	this.getPosition = function(card){
		var index = hand.indexOf(card);
		return index;
	}
	
	this.removePlayerCard = function(card){
		 var index = hand.indexOf(card);
		 //console.log(index);
		 hand[index] = null;
	}
	
	
	
	
   this.sortByValue = function() {
    while (hand.length > 0) {
         //debugger;
				 var pos = 0;  // Position of minimal card.
         var c = hand[0];  // Minimal card.
         for (var i = 1; i < hand.length; i++) {
            var c1 = hand[i];
            if ( c1.getSuit() < c.getSuit() ||
                    (c1.getSuit() == c.getSuit() && c1.getValue() < c.getValue()) ) {
                pos = i;
                c = c1;
            
            if ( c1.getValue() < c.getValue() ||
                    (c1.getValue() == c.getValue() && c1.getSuit() < c.getSuit()) ) {
                pos = i;
                c = c1;
            }
         }
         }
         hand.splice(pos, 1);
         newHand.push(c);
      } 
			hand = newHand;
   }
	 
	
}