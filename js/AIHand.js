function AIPlayer(h){
	var hand = h;
	var calledHands;
	var wonHands = 0;
	
	var rule = new Rule();
	
	var allCards = [];
	var suitInHand = [];
	var troopInHand = [];
	var otherCards = [];
	
	var heartInHand = [];
	var spadeInHand = [];
	var clubInHand = [];
	var diamondInHand = [];
	this.setCalledHands = function(num){
		calledHands = num;
	}
	this.getCalledHands = function(){
		return calledHands;
	}
	
	this.increaseWonHands = function(){
		wonHands++;
	}
	this.getWonHands = function(){
		return wonHands;
	}
	
	
	this.throwCard = function(cards){
		var card, playedSuit;
		if(cards.length != 0){
			playedSuit = cards[0].getSuit();
		}
		cardsInHand(playedSuit);
		
		if(cards.length != 0){	
			var highCard = rule.checkHighCard(cards);
			var highCardSuit = highCard.getSuit();
			var highCardValue = highCard.getValue();			
			
			if(suitInHand.length == 0 && troopInHand.length == 0)
				card = otherCards[0];
		
			else if(suitInHand.length == 0){
				
				if(highCardSuit == playedSuit)
					card = troopInHand[0];
				else{
					var c = getSuitableTroop(highCardValue);
					
					if(c == 0){
						if(otherCards.length != 0)
							card = otherCards[0];
						else 
							card = suitInHand[0];
					}
					else
						card = c;
				}	
			}
			else{
				if(highCardSuit == playedSuit){
					var c = getSuitableCard(highCardValue);
					
					if(c == 0)
						card = suitInHand[0];
					else
						card = c;
				}
				else
					card = suitInHand[0];
			}
		}
		else{
			card = firstCard();
		}//hand.removePlayerCard(card);
		suitInHand = [];
		troopInHand = [];
		otherCards = [];
		allCards = [];
		return card;
	}
	
	this.callHand = function(){
		this.setCalledHands(2);
		return 2;
	}
	
	var cardsInHand = function(playedSuit){
		
		for(var i = 0; i < hand.getCardCount(); i++){
			
			var card = hand.getCard(i);
			if(card != null){
				
				if(card.getSuit() == playedSuit){
					suitInHand.push(card);
					allCards.push(card);
				}
				
				else if(card.getSuit() == 1){
					troopInHand.push(card);
					allCards.push(card);
				}
				else{
					otherCards.push(card);
					allCards.push(card);
				}
			}
		}
			
	}
	
	var getSuitableTroop = function(highCardValue){
		for(var i = 0; i < troopInHand.length; i++){
			if(troopInHand[i].getValue() > highCardValue)
				return troopInHand[i];
		}
		return 0;
	}
		
	var getSuitableCard = function(highCardValue){
		for(var i = 0; i < suitInHand.length; i++){
			if(suitInHand[i].getValue() > highCardValue)
				return suitInHand[i];
		}
		return 0;
	}
	
	
	var firstCard = function (){
		
		var randomNum = parseInt(Math.random() * allCards.length);
		/* for(var i = 0; i <= allCards.length; i++){
			var randomNum = parseInt(Math.random()*	allCards.length);
			
		} */
		return allCards[randomNum];
	}
}