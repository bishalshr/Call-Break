function AIPlayer(h){
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
	
	this.throwCard = function(a){
		console.log(a.length);
		var card = hand.getCard(0);
		hand.removeCard(card);
		return card;
	}
	
	this.callHand = function(){
		this.setCalledHands(2);
		return 2;
	}
}