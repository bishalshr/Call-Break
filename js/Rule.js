function Rule(){
	
	var validCard = [];
	var troopCard = [];
	var that = this;
		
	
	this.winCheck = function(firstCard, secondCard, thirdCard, fourthCard, cards){
		var highCard = that.checkHighCard(cards);
		
		if(highCard == firstCard){
			return 1;
		}else if(highCard == secondCard){
			return 2;
		}else if(highCard == thirdCard){
			return 3;
		}else
			return 4;
	}

	
	this.checkHighCard = function(cards){
		var max;
		var playedSuit = cards[0].getSuit();
		
		for(var i = 0; i < cards.length; i++){
			valid(cards[i], playedSuit);			
		}
		if(troopCard.length == 0){
			max = validCard[0];
			
			for(var i = 0; i < validCard.length; i++){
				if(validCard[i].getValue() > max.getValue())
					max = validCard[i];
			}
		}else{
			max = troopCard[0];
			
			for(var i = 0; i < troopCard.length; i++){
				if(troopCard[i].getValue() > max.getValue())
					max = troopCard[i];
			}
		}
		
		validCard = [];
		troopCard = [];
		return max;
	}
	 
	
	var valid = function(card, playedSuit){
		if(card != null){
			if(card.getSuit() == 1){
				troopCard.push(card);
			}else if (card.getSuit() == playedSuit){
				validCard.push(card);
			}
		}
	}
	
	
	this.checkValidity = function(cards, hand, thrown){
		var value;
		var length = cards.length;
		var neededSuit = cards[0].getSuit();
		var highCard = that.checkHighCard(cards);
				
		var suitInHand = checkSuitInHand(neededSuit, highCard, hand);
		var troopInHand = checkTroopInHand(highCard, hand);
		var playedSuit = thrown.getSuit();
		var playedValue = thrown.getValue();
		var highCardSuit = highCard.getSuit();
		var highCardValue = highCard.getValue();
		
		if(highCardSuit == neededSuit && playedSuit == neededSuit){
			if(suitInHand == 2 && playedValue > highCardValue){
				value = true;
			}else if(suitInHand == 1){
				value = true;
			}else 
				value = false;
		}else if(highCardSuit == neededSuit){
			if(suitInHand == 2 || suitInHand == 1){
				value = false;
			}else if(troopInHand && playedSuit != 1){
				value = false;
			}else{ 
				value = true;
			}
		}else{
			if(playedSuit == neededSuit){
				value = true;
			}else if(playedSuit == 1){
				if(suitInHand == 1 || suitInHand == 2){
					value = false;
				}else if(troopInHand == 2 && playedValue > highCardValue){
					value = true;
				}else if(troopInHand == 1){
					value = true;
				}else{
					value = false;
				}
			}else{
				if(suitInHand == 0 && (troopInHand == 0 || troopInHand == 1)){
					value = true;
				}else{
					value = false;
				}
			}
		} 
		return value;
	} 
	
	
	var checkSuitInHand = function(validSuit, highCard, hand){
		for(var i = 0; i < hand.getCardCount(); i++){
			var card = hand.getCard(i); 
			
			if(card != null){
				if(card.getSuit() == validSuit && card.getValue() > highCard.getValue()){
					return 2;
				}
			}
		}
		for(var i = 0; i < hand.getCardCount(); i++){
			var card = hand.getCard(i); 
			
			if(card != null){
				if(card.getSuit() == validSuit){
					return 1;
				}
			}
		}
		return 0;
	}
	
	
	var checkTroopInHand = function(highCard, hand){
		for(var i = 0; i < hand.getCardCount(); i++){
			var card = hand.getCard(i);
			
			if(card != null){
				if(card.getSuit() == 1 && highCard.getSuit() == 1 && card.getValue() > highCard.getValue()){
					return 2;
				}
			}
		}
		for(var i = 0; i < hand.getCardCount(); i++){
			var card = hand.getCard(i); 
			
			if(card != null){
				if(card.getSuit() == 1){
					return 1;
				}
			}
		}
		return 0;
	}
}