function AIPlayer(h, diff){
	var hand = h;
	var calledHands;
	var wonHands = 0;
	
	var difficulty = diff;
	
	var rule = new Rule();
	
	var thrownCards = [];
	var thrownSpades = [];
	var thrownHearts = [];
	var thrownClubs = [];
	var thrownDiamonds = [];
	
	var highCards = [13, 13, 13, 13];
	var trooped = [0, 0, 0, 0];
	
	var situation = 0;			//0 means any. 1 means same suit but any. 2 means same suit higher. 3 means troop any. 4 means troop higher.
	
	var heartsInHand = [];
	var spadesInHand = [];
	var clubsInHand = [];
	var diamondsInHand = [];
	var cardsCollection = [];
	var allCardsInHand = [];
	
	var validCard = [];
	var throwingCard;

	var round = 0;
	var turn;
	
	var playedSuit;
	var highCard;
	
		
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
	
	
	this.addThrownCards = function(cards){
		var played = cards[0].getSuit();
		
		for(var i = 0; i < cards.length; i++){
			thrownCards.push(cards[i].getValue());
			
			if(played > 1 && cards[i].getSuit() == 1){
				trooped[played - 1] = 1;
			}
			if(cards[i].getSuit() == 1){
				thrownSpades.push(cards[i].getValue());
			}else if(cards[i].getSuit() == 2){
				thrownDiamonds.push(cards[i].getValue());
			}else if(cards[i].getSuit() == 3){
				thrownClubs.push(cards[i].getValue());
			}else{ 
				thrownHearts.push(cards[i].getValue());
			}
		}
		thrownSpades.sort(function(a, b){return b-a});
		thrownDiamonds.sort(function(a, b){return b-a});
		thrownClubs.sort(function(a, b){return b-a});
		thrownHearts.sort(function(a, b){return b-a});
		
		setHighCard(thrownSpades, 0);
		setHighCard(thrownDiamonds, 1);
		setHighCard(thrownClubs, 2);
		setHighCard(thrownHearts, 3 );
	}
	
	
	var setHighCard = function(array, pos){
		for(var i = 0; i < array.length; i++){
			if(array[i] == highCards[pos]){
				highCards[pos]--;
			}
		}
	}
	
	
	this.separateCards = function(){
		for(var i = 0; i < hand.getCardCount(); i++){
			var card = hand.getCard(i);
			
			if(card.getSuit() == 1){
				spadesInHand.push(card);
			}else if(card.getSuit() == 2){
				diamondsInHand.push(card);
			}else if(card.getSuit() == 3){
				clubsInHand.push(card);
			}else{
				heartsInHand.push(card);
			}
			allCardsInHand.push(card);
		}
		cardsCollection.push(spadesInHand);
		cardsCollection.push(diamondsInHand);
		cardsCollection.push(clubsInHand);
		cardsCollection.push(heartsInHand)
	}
	
	
	this.throwCard = function(cards){
		var highCardSuit;
		var highCardValue;
		
		turn = cards.length + 1;
		
		if(cards.length != 0){
			playedSuit = cards[0].getSuit();
			highCard = rule.checkHighCard(cards);
			highCardSuit = highCard.getSuit();
			highCardValue = highCard.getValue();
			
			makeValidCardsArray();
		}else{
			validCard = allCardsInHand;
			situation = 0;
		}
		if(difficulty == 1){
			begineerLevel();
		}else{ 
			mediumLevel();
		}
		
		round++;
		validCard = [];
		situation = 0;
		
		removeCard(throwingCard);
		return throwingCard;
	}
	
	
	this.callHand = function(){
		var toCall = 0;
		
		toCall += addHandFromSuit(heartsInHand);
		toCall += addHandFromSuit(diamondsInHand);
		toCall += addHandFromSuit(clubsInHand);
		
		if(difficulty == 1){
			toCall += addHandFromSuit(spadesInHand);
		}else{
			toCall += addHandFromSpade(spadesInHand);
		}
		this.setCalledHands(toCall);
		
		if(toCall == 0){
			return 1;
		}else{
			return toCall;
		}
	}
	
	
	var addHandFromSuit = function(cards){
		var toCall = 0;
		
		for(var i = 0; i < cards.length; i++){
			var card = cards[i].getValue();
			
			if(card == 13){
				toCall++;
			}else if(card == 12 && cards.length > 1 && cards.length < 5){
				toCall++;
			}
			
		}
		if(cards.length == 1 && spadesInHand.length > 3){
			toCall++;
		}
		return toCall;
	}
	
	
	var addHandFromSpade = function(cards){
		var toCall = 0;
		
		for(var i = cards.length - 1; i >= 0; i--){
			var card = cards[i].getValue();
			
			if(card == 13){
				toCall++;
			}else if(cards.length >= 2){
				if((toCall == (cards.length - 1 - i)) && (card == (13 - toCall))){
					toCall++;
				}else if(card == 12 && cards.length > 1){
					toCall++;
				}else if(card >= 10 && i > 0){
					if(cards[i-1].getValue() >= 10){
						toCall++;
					}
				}
			}
			
		}
		
		if(cards.length >= 3 && cards.length <= 5 && toCall == 0){
			toCall++;
		}else if(cards.length > 5 && toCall <= 1){
			toCall = 2;
		}else if(cards.length >= 5 && toCall > 1){
			toCall = cards.length - 2;
		}
		return toCall;
	}
	
	
	var makeValidCardsArray = function(){
		var validSuitArray = cardsCollection[playedSuit - 1];
		
		if(validSuitArray.length != 0){
			for(var i = 0; i < validSuitArray.length; i++){
				if(validSuitArray[i].getValue() > highCard.getValue() && playedSuit == highCard.getSuit()){
					validCard.push(validSuitArray[i]);
				}
			}
			if(validCard.length == 0){
				validCard = validSuitArray;
				situation = 1;
			}
			else{
				situation = 2;
			}
		}else if(validSuitArray.length == 0 && spadesInHand.length != 0){
			if(playedSuit == highCard.getSuit()){
				validCard = spadesInHand;
				situation = 3;
			}else{
				for(var i = 0; i < spadesInHand.length; i++){
					if(spadesInHand[i].getValue() > highCard.getValue()){
						validCard.push(spadesInHand[i]);
					}
				}
				if(validCard.length == 0){
					validCard = allCardsInHand;
					situation = 0;
				}else{ 
					situation = 4;
				}
			}
		}else{
			validCard = allCardsInHand;
			situation = 0;
		}
		
	}
	
	
	var removeCard = function(card){
		if(card){
			var index;
		
			if(card.getSuit() == 1){
				index = spadesInHand.indexOf(card);
				spadesInHand.splice(index, 1);
			}else if(card.getSuit() == 2){
				index = diamondsInHand.indexOf(card);
				diamondsInHand.splice(index, 1);
			}else if(card.getSuit() == 3){
				index = clubsInHand.indexOf(card);
				clubsInHand.splice(index, 1);
			}else{
				index = heartsInHand.indexOf(card);
				heartsInHand.splice(index, 1);
			}
		
			index = allCardsInHand.indexOf(card);
			allCardsInHand.splice(index, 1);
		}
	}
	
	
	var mediumLevel = function(){
		if(validCard.length == 1){
			throwingCard = validCard[0];
		}else{
			searchSuitableCard();
		}
	}
	
	
	var begineerLevel = function(){
		if(turn == 1){
			throwWinningCard();
		}else{
			throwingCard = validCard[0];
		}
	}
	
	
	var throwFirstCard = function(){
		if(round < 5){
			if(spadesInHand.length >= 5 && spadesInHand[spadesInHand.length - 1] != highCards[0]){
				throwingCard = spadesInHand[0];
			}else if(dropOthersHighCard() == 0){
				throwMinimumSuitCard();
			}
		}else{
			throwWinningCard();
		}
	}
	
	
	var dropOthersHighCard = function(){
		var value1, value2, value3, value;
		
		value3 = checkBestCard(heartsInHand, 3);
		value2 = checkBestCard(clubsInHand, 2);
		value1 = checkBestCard(diamondsInHand, 1);
	
		if(value3 == 1){
			throwingCard = heartsInHand[heartsInHand.length - 2];
		}else if(value2 == 1){
			throwingCard = clubsInHand[clubsInHand.length - 2];
		}else if(value1 == 1){
			throwingCard = diamondsInHand[diamondsInHand.length - 2];
		}else{ 
			return 0;
		}
		
		return 1;
	}
	
	
	var throwMinimumSuitCard = function(){
		var min = allCardsInHand;
		
		for(var i = 1; i < cardsCollection.length; i++){
			if (cardsCollection[i].length < min.length && cardsCollection[i].length > 0){
				min = cardsCollection[i];
			}
		}
		
		if(min[min.length -1].getValue() == highCards[min[0].getSuit() - 1] && turn == 1){
			throwingCard = min[min.length - 1];
		}
		else{
			throwingCard = min[0];
		}
	}
	
	
	var throwWinningCard = function(){
		var value0, value1, value2, value3;
		
		value0 = checkBestCard(spadesInHand, 0);
		value3 = checkBestCard(heartsInHand, 3);
		value2 = checkBestCard(clubsInHand, 2);
		value1 = checkBestCard(diamondsInHand, 1);
			
		if(value0 == 2){
			throwingCard = spadesInHand[spadesInHand.length - 1];
		}else if(value3 == 2 && trooped[3] == 0){
			throwingCard = heartsInHand[heartsInHand.length - 1];
		}else if(value2 == 2 && trooped[2] == 0){
			throwingCard = clubsInHand[clubsInHand.length - 1];
		}else if(value1 == 2 && trooped[1] == 0){
			throwingCard = diamondsInHand[diamondsInHand.length - 1];
		}else{
			throwMinimumSuitCard();
		}
	}
	
	
	var checkBestCard = function(array, pos){
		if(array.length != 0){
			if(array[array.length - 1].getValue() == highCards[pos]){
				return 2;
			}else if(array[array.length - 1].getValue() == highCards[pos] - 1 && array.length > 1)
				return 1;
			else
				return 0;
		}
		else{
			return 0;
		}
	}
	
	
	var searchSuitableCard = function(){
		switch(situation){
			case 0:
				if(turn == 1)
					throwFirstCard();
				else 
					throwMinimumSuitCard();
				break;
			case 1:
				throwingCard = validCard[0];
				break;
			case 2:
				throwHigherCard();
				break;
			case 3:
				throwingCard = validCard[0];
				break;
			case 4:
				throwingCard = validCard[0];
				break;
		}
	}
	
	var throwHigherCard = function(){
		var value = checkBestCard(validCard, playedSuit - 1);
		
		if(value == 2 && turn != 4){
			throwingCard = validCard[validCard.length - 1];
		}else{
			switch(turn){
				case 2:
					throwingCard = validCard [validCard.length-2];
					break;
				case 3:
					if(highCard.getValue() > highCards[playedSuit - 1] - 4){
						throwingCard = validCard[0];
					}else if(validCard[validCard.length -2] > highCards[playedSuit - 1] - 5){
						throwingCard = validCard[validCard.length - 2];
					}else{ 
						throwingCard = validCard[validCard.length - 1];
					}
					break;
				case 4:
					throwingCard = validCard[0];
					break;
			}
		}
		
	}
}