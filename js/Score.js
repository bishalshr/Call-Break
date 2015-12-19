function Score(){
	var p1Score = [], p2Score = [], p3Score= [], yourScore = [];
	var p1Called, p2Called, p3Called, youCalled;
	
	this.setScore = function(score1, score2, score3, score4){
		
		var p1Final = checkFinal(score1, p1Called);
		var p2Final = checkFinal(score2, p2Called);
		var p3Final = checkFinal(score3, p3Called);
		var p4Final = checkFinal(score4, youCalled);
		
		p1Score.push(p1Final);
		p2Score.push(p2Final);
		p3Score.push(p3Final);
		yourScore.push(p4Final);
		
	}
	
	var checkFinal = function(scored, called){
		var score;
		var extraHand = scored - called;
		if(extraHand < 0)
			score = - called;
		
		else{
			score = (called * 10 + extraHand) / 10;
		}
		return score;
	}
	
	this.setCalledHands = function(called1, called2, called3, called4){
		p1Called = called1;
		p2Called = called2;
		p3Called = called3;
		youCalled = called4;
	
	}
	
	this.getP1Score = function(num){
		
		return p1Score[num];
	}
	
	this.getP2Score = function(num){
		
		return p2Score[num];
	}
	
	this.getP3Score = function(num){
		
		return p3Score[num];
	}
	
	this.getYourScore = function(num){
		
		return yourScore[num];
	}
	
	this.getYourTotal = function(){
		var total = 0;
		for(var i = 0; i < yourScore.length; i++){
			total += yourScore[i];
		}
		return total;
	}
	
	this.getP1Total = function(){
		var total = 0;
		for(var i = 0; i < p1Score.length; i++){
			total += p1Score[i];
		}
		return total;
	}
	
	this.getP2Total = function(){
		var total = 0;
		for(var i = 0; i < p2Score.length; i++){
			total += p2Score[i];
		}
		return total;
	}
	
	this.getP3Total = function(){
		var total = 0;
		for(var i = 0; i < p3Score.length; i++){
			total += p3Score[i];
		}
		return total;
	}
}