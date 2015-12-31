function Score(){
	var p1Score = [];
	var	p2Score = [];
	var p3Score= [];
	var yourScore = [];
	
	var p1Called;
	var p2Called;
	var p3Called;
	var youCalled;
	
	
	this.setScore = function(score1, score2, score3, score4){
		var p1RoundScore = checkRoundScore(score1, p1Called);
		var p2RoundScore = checkRoundScore(score2, p2Called);
		var p3RoundScore = checkRoundScore(score3, p3Called);
		var p4RoundScore = checkRoundScore(score4, youCalled);
		
		p1Score.push(p1RoundScore);
		p2Score.push(p2RoundScore);
		p3Score.push(p3RoundScore);
		yourScore.push(p4RoundScore);
	}
	
	
	var checkRoundScore = function(scored, called){
		var score;
		var extraHand = scored - called;
		
		if(extraHand < 0){
			score = - called;
		}else{
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