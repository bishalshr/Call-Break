function SubGame(finalScore){
	var animator;
	var count = 0, flag = 0;
	var throwingPos, throwTurn, callTurn, wholeRound, turn, round = 0;
	var p1Played, p2Played, p3Played, youPlayed;
	var p1Called, p2Called, p3Called, youCalled;
	
	var subGameView = new SubGameView(finalScore);
	
	var showBtn, playerDiv = [];
	
	var playerInfo = [], cardBox = [];
	
	var player1, player2, player3, yourHand;
	var rule, callHandSelect;
	var thrownCards = [], timer = 500;
	
	
	for(var i = 0; i < 13; i++){
		thrownCards[i] = [];
	}
	
	var AIPlayer1, AIPlayer2, AIPlayer3, you;
	
	this.getWholeRound = function(){
		return wholeRound;
	}
	
	this.setWholeRound = function(num){
		wholeRound = num;
	}
	
	this.init = function(){
		
		subGameView.setTable();
		
		subGameView.setChair(700, 110, 400, 190);
		subGameView.setChair(250, 10, 150, 400);
		subGameView.setChair(10, 100, 400, 190);
		cardBox = subGameView.setChair(250, 440, 150, 400);
		
		subGameView.setPlayingArea();
		subGameView.setThrowingArea();
		
		setTurn();
		setHand();
		setDeck();
		dealCards();
		
		
	}
	
	
	var setTurn = function(){
		turn = wholeRound % 4;
	}
	
	var setHand = function(){
		player1 = new Hand(0);
		player2 = new Hand(1);
		player3 = new Hand(2);
		yourHand = new Hand(3);
	}
	
	
	var setDeck = function(){
		var deck = new Deck();
		deck.newDeck();
		deck.shuffle();
		
		for(var i = 0; i < 52; i = i+4){
			yourHand.addCard(deck.dealCard());
			player1.addCard(deck.dealCard());
			player2.addCard(deck.dealCard());
			player3.addCard(deck.dealCard());
		}
		
		player1.sortByValue();
		player2.sortByValue();
		player3.sortByValue();
		
		you = new Player(yourHand);
		aIPlayer1 = new AIPlayer(player1);
		aIPlayer2 = new AIPlayer(player2);
		aIPlayer3 = new AIPlayer(player3);
		
		aIPlayer1.separateCards();
		aIPlayer2.separateCards();
		aIPlayer3.separateCards();
		
		rule = new Rule();
	}
	
	
	var dealCards = function(){
		count = 0, flag = 0;
		animator = new Animator();
		
		deal();
	
	}
	
	
	var deal = function(){
		var snd = new Audio("aud.mp3"); // buffers automatically when created
		snd.play();
		var pos = parseInt(count / 4);
		
		if(flag == 0){
			animator.init(0,0);
			animator.animate('left', 380, 50);
			
			var card = player1.getCard(pos);
			subGameView.setImage(0, pos, card, false);
						
			flag++;
			count++;
				
		}else if(flag == 1){
			animator.init(0,0);
			animator.animate('top', -150, 50);
			
			var card = player2.getCard(pos);
			subGameView.setImage(1, pos, card, false);
						
			flag++;
			count++;
			
		}else if(flag == 2){
			animator.init(0,0);
			animator.animate('left', -380, 50);
			
			var card = player3.getCard(pos);
			subGameView.setImage(2, pos, card, false);
						
			flag++;
			count++;
			
		}else if (flag == 3){
			animator.init(0, 0);
			animator.animate('top', 150, 50);
			var card = yourHand.getCard(pos);
			subGameView.setImage(3, pos, card, false);
					
			for(var i = 39; i< 52; i++){
				playerDiv.push(cardBox[i].element);
			}
			
			for(var i = 0; i <= count / 4; i++){
				cardBox[39+i].element.addEventListener('click', displayCard);
			} 
			
			flag = 0;
			count++;
		}
		
		if(count != 52){
			setTimeout(deal, 70);
		}
		else
			showAllCard();
	}
	
	
	var displayCard = function(){
	
		var card = yourHand.getCard(parseInt(this.id)-39);
		
		var index = parseInt(this.id);
		
		subGameView.removeChildNodes(index);
		subGameView.setImage(3, this.id-39, card, true);
		
		for(var i = 0; i <= count / 4; i++){
			this.removeEventListener('click', displayCard);
		}
	}
	
	
	var showAllCard = function(){
		
		showBtn = subGameView.showAllCardView();
		
		showBtn.element.addEventListener('click', arrangeCard);
	}
	
	var arrangeCard = function(){
		yourHand.sortByValue();
		
		subGameView.arrangeCardView();
		
		for(var i = 39; i <= 51; i++){
			var id = parseInt(cardBox[i].element.id)-39;
			var card = yourHand.getCard(id);
			subGameView.setImage(3, id, card, true);
		}
		
		showBtn.element.removeEventListener('click', arrangeCard);
		callTurn = 0;
		callHand();
	}
		
	var callHand = function(){
		if(callTurn == 4){
			finalScore.setCalledHands(p1Called, p2Called, p3Called, parseInt(youCalled));
			
			startRound();
		}
		else{
			
			if(turn == 0 && callTurn != 4){
				callYourHand();
			}
			if(turn == 1 && callTurn != 4){
				p1Called = aIPlayer1.callHand();
				subGameView.setCalledHandsView(p1Called, 0);
				turn++;
				callTurn++;
				if(callTurn == 4)	callHand();
			}
			if(turn == 2 && callTurn != 4){
				p2Called = aIPlayer2.callHand();
				subGameView.setCalledHandsView(p2Called, 1);
				turn++;
				callTurn++;
				if(callTurn == 4)	callHand();
			}
			if(turn == 3 && callTurn != 4){
				p3Called = aIPlayer3.callHand();
				subGameView.setCalledHandsView(p3Called, 2);
				turn = 0;
				callTurn++;
				callHand();
			}
		}
	}
	
	var callYourHand = function(){
		
		callHandSelect = subGameView.callHandView().element;
		showBtn.element.addEventListener('click',callNext);
		
	}
	
	
	var callNext = function(){
		youCalled = callHandSelect[callHandSelect.selectedIndex].value;
		
		you.setCalledHands(youCalled);
		subGameView.setCalledHandsView(youCalled, 3);
					
		showBtn.element.removeEventListener('click',callNext);
		turn++;
		callTurn++;
		callHand();
			
	}
	
	var startRound = function(){
		
		throwingPos = 0;
		throwTurn = 0;
		p1Played = p2Played = p3Played = youPlayed = null;
		if(round == 0){
			setTimeout(finish, 200);
		}
		
		else 
			throwCards();
	}
	
	
	var throwCards = function(){
		if(turn == 0 && throwTurn != 4){
			youThrowCard();
		}
		if(turn == 1 && throwTurn != 4){
			
			p1Played = aIPlayer1.throwCard(thrownCards[round]);
			thrownCards[round].push(p1Played);
			
			setTimeout(aIThrowCardP1, timer);
			turn++;
			throwTurn++;
			timer += 500;
		}
		
		if(turn == 2  && throwTurn != 4){
			
			p2Played = aIPlayer2.throwCard(thrownCards[round]);
			thrownCards[round].push(p2Played);
			setTimeout(aIThrowCardP2, timer);
			turn++;
			throwTurn++;
			timer += 500;
		}
		
		if(turn == 3 && throwTurn != 4){
			
			p3Played = aIPlayer3.throwCard(thrownCards[round]);
			thrownCards[round].push(p3Played);
			setTimeout(aIThrowCardP3, timer);
			turn = 0;
			throwTurn++;
			
			timer += 500;
			if(throwTurn != 4)
				setTimeout(youThrowCard, timer);
			
		}
		
		if(throwTurn == 4){
			
		//	timer = timer - 400;
			setTimeout(finishRound, timer + 500);
			throwTurn = 0;
			//timer += 100;
			//setTimeout(startRound, timer);
		}
		
	}
	
	
	var youThrowCard = function(){
		//console.log(highCard ,'lksjdflkj');		
		//cardBox = document.getElementsByClassName('card-holder');
		for(var x = 0; x < 13;x++ ){
			//console.log(ab[x]);
			playerDiv[x].addEventListener('click', throwCard);
		}
	} 
	
	var throwCard = function(){
		for(var i = 0; i < 13; i++ ){
				playerDiv[i].removeEventListener('click', throwCard);
			}
		
		var valid;
		
		var pos = parseInt(this.id)-39;
		youPlayed = yourHand.getCard(pos);
		
		//if(highCard!=null)
		if(thrownCards[round] != 0){
			valid = rule.checkValidity(thrownCards[round], yourHand, youPlayed); 
		}
				
		 if(valid == false){
			youThrowCard();
			
		} 
		
		else{
			
			thrownCards[round].push(youPlayed);
			
			
			var imageValue = youPlayed.getImgValue();
			
			var index = yourHand.getPosition(youPlayed);
			subGameView.removeChildNodes(39 + index);
		
			var snd = new Audio("throw.mp3"); // buffers automatically when created
			snd.play();
			
			yourHand.removePlayerCard(youPlayed);
			
			animator.init(imageValue,1);
			animator.animate('bottom', 250, 200);
		
			subGameView.throwCard(imageValue, throwingPos);
			throwingPos++;
			
			timer = 500;
			turn++;
			throwTurn++;
			throwCards();
			
		}
	}
	
	
	var aIThrowCardP1 = function(){
		var p1CardValue = p1Played.getImgValue();
		var index = player1.getPosition(p1Played);
		player1.removePlayerCard(p1Played);
		
		var snd = new Audio("throw.mp3"); // buffers automatically when created
		snd.play();
		
		animator.init(p1CardValue, 2);
		animator.animate('right', 375, 200);
		
		subGameView.removeChildNodes(index);
		subGameView.throwCard(p1CardValue, throwingPos);
		
		throwingPos++;
	}
	
	
	
	var aIThrowCardP2 = function(){
		var p2CardValue = p2Played.getImgValue();
		var index = player2.getPosition(p2Played);
		
		player2.removePlayerCard(p2Played);
		
		var snd = new Audio("throw.mp3"); // buffers automatically when created
		snd.play();
			
		animator.init(p2CardValue, 3);
		animator.animate('top', 250, 200);
			
		subGameView.removeChildNodes(13 + index);
		subGameView.throwCard(p2CardValue, throwingPos);
		
		throwingPos++;
	}
	
	
	
	var aIThrowCardP3 = function(){
		var p3CardValue = p3Played.getImgValue();
		var index = player3.getPosition(p3Played);
		
		var snd = new Audio("throw.mp3"); // buffers automatically when created
		snd.play();
			
		player3.removePlayerCard(p3Played);
		animator.init(p3CardValue,4);
		animator.animate('left', 375, 200);
				
		subGameView.removeChildNodes(26 + index);
		subGameView.throwCard(p3CardValue, throwingPos);
		
		throwingPos++;
	}
	
	
	
	var finishRound = function(){
		
		aIPlayer1.setThrownCards(thrownCards[round]);
		aIPlayer2.setThrownCards(thrownCards[round]);
		aIPlayer3.setThrownCards(thrownCards[round]);
		
		var won = rule.winCheck(youPlayed, p1Played, p2Played, p3Played, thrownCards[round]);
		turn = won - 1;
		round++;
		
		subGameView.clearPlayingArea();
		
		var snd = new Audio("audio.mp3"); // buffers automatically when created
		snd.play();
		
		if(won == 1){
			animator.init(0, 0);
			animator.animate('top', 250, 200);
			
			you.increaseWonHands();
			subGameView.updateHandsWon(won, you.getWonHands());
		}
		
		else if(won == 2){
			animator.init(0, 0);
			animator.animate('left', 425, 200);
			
			aIPlayer1.increaseWonHands();
			subGameView.updateHandsWon(won, aIPlayer1.getWonHands());
		}
		
		else if(won == 3){
			animator.init(0, 0);
			animator.animate('top', -250, 200);
			
			aIPlayer2.increaseWonHands();
			subGameView.updateHandsWon(won, aIPlayer2.getWonHands());
		}
		
		else{
			animator.init(0, 0);
			animator.animate('left', -425, 200);
			
			aIPlayer3.increaseWonHands();
			subGameView.updateHandsWon(won, aIPlayer3.getWonHands());
		}
		startRound();
		timer = 500;
	
	}
		
	
	var finish = function(){
		
		finalScore.setScore(aIPlayer1.getWonHands(), aIPlayer2.getWonHands(), aIPlayer3.getWonHands(), you.getWonHands());
		
		subGameView.updateFinalScore(wholeRound);
		wholeRound++;
	}
}
	