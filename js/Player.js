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
	
}	
	