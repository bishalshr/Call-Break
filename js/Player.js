function Player(h){
	var hand = h;
	var calledHands;
	var wonHands = 0;
	
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
	
	
	this.checkValidity = function(card1, card2, card3, card4, playedSuit){
		var playedSuit, inHand, troopInHand, highCard;
		
		/* console.log( playedSuit);
		if(!card1 && !card2 && !card3){
			return true;
		}
		else if(!card1 && !card2 && card3){
			playedSuit = card3.getSuit();
		}
		
		else if(!card1 && card2){
			playedSuit = card2.getSuit();
		}
		else{
			playedSuit = card1.getSuit();
		}
		compareCard(card1, card2, card3, playedSuit);
		
		inHand = checkCardInHand(playedSuit);
		troopInHand = checkTroopInHand();
		if(playedSuit == card4.getSuit())
			return false;
		 */
		return true;
	}
	
	
	
	/* var compareCard(card1, card2, card3, playedSuit) */
}