function Rule(h1, h2, h3, h4){
	
	var hand = h4;
	var p1Hand = h1;
	var p2Hand = h2;
	var p3Hand = h3;
	var validCard = [], troopCard = [];
		
	this.winCheck = function(firstCard, secondCard, thirdCard, fourthCard){
			
		if(firstCard.getValue() > secondCard.getValue() && firstCard.getValue() > thirdCard.getValue() && firstCard.getValue() > fourthCard.getValue())
			return 1;
		
		else if(secondCard.getValue() > firstCard.getValue() && secondCard.getValue() > thirdCard.getValue() && secondCard.getValue() > fourthCard.getValue())
			return 2;
		
		else if(thirdCard.getValue() > firstCard.getValue() && thirdCard.getValue() > secondCard.getValue() && thirdCard.getValue() > fourthCard.getValue())
			return 3;
		
		else
			return 4;
	}

	this.checkHighCard = function(card1, card2, card3, card4, playedSuit){
		var max ;
		valid(card1, playedSuit);
		valid(card2, playedSuit);
		valid(card3, playedSuit);
		valid(card4, playedSuit);
		
		if(troopCard.length == 0){
			max = validCard[0];
			for(var i = 0; i < validCard.length; i++){
				if(validCard[i].getValue() > max.getValue())
					max = validCard[i];
			}
		}
		else{
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
			if(card.getSuit() == 1)
				troopCard.push(card);
			else if (card.getSuit() == playedSuit)
				validCard.push(card);
		}
	}
	
	
	this.checkValidity = function(card, neededSuit, highCard){
		var value;
		var suitInHand = checkSuitInHand(neededSuit, highCard);
		var troopInHand = checkTroopInHand(highCard);
		var playedSuit = card.getSuit();
		var playedValue = card.getValue();
		var highCardSuit = highCard.getSuit();
		var highCardValue = highCard.getValue();
					
		if(highCardSuit == neededSuit){
			
			if(playedSuit == neededSuit){
				if(suitInHand == 2 && playedValue > highCardValue)
					value = true;
			
				else if(suitInHand == 1)
					value = true;
			
				else 
					value = false;
			}
			else{
				if(suitInHand == 2 || suitInHand == 1)
					value = false;
				
				else if(troopInHand && playedSuit != 1)
					value = false;
				
				else 
					value = true;
				
			}
			
		} 
		
		else{
			if(playedSuit == neededSuit){
				value = true;
			}
			else if(playedSuit == 1){
				if(suitInHand == 1 || suitInHand == 2)
					value = false;
				
				else if(troopInHand == 2 && playedValue > highCardValue)
					value = true;
				
				else if(troopInHand == 1)
					value = true;
				
				else 
					value = false;
			}
			else{
				if(suitInHand == 0 || troopInHand == 0 || troopInHand == 1)
					value = true;
				else 
					value = false;
			}
			
		}
		
		 //if(value = true){
			//hand.removePlayerCard(card);
		//}	 
		return value;
	}
	
	var checkSuitInHand = function(validSuit, highCard){
		
		for(var i = 0; i <hand.getCardCount(); i++){
			var card = hand.getCard(i); 
			if(card != null){
				if(card.getSuit() == validSuit && card.getValue() > highCard.getValue())
					return 2;
			}
		}
		
		for(var i = 0; i < hand.getCardCount(); i++){
			var card = hand.getCard(i); 
			if(card != null){
				if(card.getSuit() == validSuit)
					return 1;
			}
		}
		
		return 0;
	}
	
	var checkTroopInHand = function(highCard){
		
		
		for(var i = 0; i < hand.getCardCount(); i++){
			var card = hand.getCard(i);
			if(card != null){
				if(card.getSuit() == 1 && highCard.getSuit() == 1 && card.getValue() > highCard.getValue())
					return 2;
			}
		}
		
		for(var i = 0; i < hand.getCardCount(); i++){
			var card = hand.getCard(i); 
			if(card != null){
				if(card.getSuit() == 1)
					return 1;
			}
		}
		return 0;
	}
}