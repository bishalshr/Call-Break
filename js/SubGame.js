function SubGame(finalScore, diff, mus){
	var animator;

	var	mainBox;
	
	var difficulty = diff;
	var sound = mus;
	
	var count = 0;
	var	flag = 0;
	
	var throwingPos;
	var	throwTurn;
	var callTurn;
	var wholeRound;
	var turn;
	var round = 0;
	var timer = 0;
	
	var p1Played;
	var p2Played;
	var p3Played;
	var youPlayed;
	
	var p1Called;
	var p2Called;
	var	p3Called;
	var youCalled;
	
	var player1;
	var player2;
	var player3;
	var yourHand;
	
	var AIPlayer1;
	var AIPlayer2;
	var AIPlayer3;
	var you;
	
	var subGameView = new SubGameView(finalScore, difficulty, sound);
	
	var playerInputBtn;
	var playerInfo = [];
	var cardBox = [];
	
	var rule;
	var calledHand;
	var deck;
	
	var thrownCards = [];
	for(var i = 0; i < 13; i++){
		thrownCards[i] = [];
	}
		
	
	this.setWholeRound = function(num){
		wholeRound = num;
	}
	
	
	this.init = function(){
		mainBox = subGameView.setTable();
		
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
		player1 = new Hand();
		player2 = new Hand();
		player3 = new Hand();
		yourHand = new Hand();
	}
	
	
	var setDeck = function(){
		deck = new Deck();
		deck.newDeck();
		deck.shuffle();
	}
	
	
	var dealCards = function(){
		count = 0, flag = 0;
		
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
		aIPlayer1 = new AIPlayer(player1, difficulty);
		aIPlayer2 = new AIPlayer(player2, difficulty);
		aIPlayer3 = new AIPlayer(player3, difficulty);
		
		aIPlayer1.separateCards();
		aIPlayer2.separateCards();
		aIPlayer3.separateCards();
		
		rule = new Rule();
		animator = new Animator(0, mainBox);
		
		dealAnimation();
	}
	
	
	var dealAnimation = function(){
		/* if(sound){
			var snd = new Audio('sounds/deal.mp3');
			snd.play();
		} */
		
		var pos = parseInt(count / 4);
		
		if(flag == 0){
			animator.init(0,0);
			animator.animate('left', 380, 20);
			
			var card = player1.getCard(pos);
			subGameView.setImage(0, pos, card, false);
						
			flag++;
			count++;
		}else if(flag == 1){
			animator.init(0,0);
			animator.animate('top', -150, 20);
			
			var card = player2.getCard(pos);
			subGameView.setImage(1, pos, card, false);
						
			flag++;
			count++;
		}else if(flag == 2){
			animator.init(0,0);
			animator.animate('left', -380, 20);
			
			var card = player3.getCard(pos);
			subGameView.setImage(2, pos, card, false);
						
			flag++;
			count++;
		}else if (flag == 3){
			animator.init(0, 0);
			animator.animate('top', 150, 20);
			
			var card = yourHand.getCard(pos);
			subGameView.setImage(3, pos, card, false);
			
			for(var i = 0; i <= count / 4; i++){
				cardBox[39+i].element.addEventListener('click', displayCard);
			} 
			
			flag = 0;
			count++;
		}
		if(count != 52){
			setTimeout(dealAnimation, 25);
		}else{
			showAllCard();
		}
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
		playerInputBtn = subGameView.showAllCardView();
		playerInputBtn.element.addEventListener('click', arrangeAndShowCard);
	}
	
	
	var arrangeAndShowCard = function(){
		yourHand.sortByValue();
		subGameView.arrangeCardView();
		
		for(var i = 39; i <= 51; i++){
			var id = parseInt(cardBox[i].element.id)-39;
			var card = yourHand.getCard(id);
			subGameView.setImage(3, id, card, true);
		}
		
		playerInputBtn.element.removeEventListener('click', arrangeAndShowCard);
		callTurn = 0;
		callHand();
	}
		
	
	var callHand = function(){
		if(callTurn == 4){
			finalScore.setCalledHands(p1Called, p2Called, p3Called, parseInt(youCalled));
			
			startRound();
		}else{
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
		calledHand = subGameView.callHandView().element;
		playerInputBtn.element.addEventListener('click',callNext);
	}
	
	
	var callNext = function(){
		youCalled = calledHand[calledHand.selectedIndex].value;
		
		you.setCalledHands(youCalled);
		subGameView.setCalledHandsView(youCalled, 3);
		
		playerInputBtn.element.removeEventListener('click',callNext);
		turn++;
		callTurn++;
		callHand();
	}
	
	
	var startRound = function(){
		throwingPos = 0;
		throwTurn = 0;
		timer = 500;
		p1Played = p2Played = p3Played = youPlayed = null;
		if(round == 13){
			setTimeout(finish, 200);
		}else{ 
			throwCards();
		}
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
			if(throwTurn != 4){
				setTimeout(youThrowCard, timer);
			}
		}
		if(throwTurn == 4){
			setTimeout(finishRound, timer + 500);
			throwTurn = 0;
		}
	}
	
	
	var youThrowCard = function(){
		for(var i = 39; i < 52; i++ ){
			cardBox[i].element.addEventListener('click', throwCard);
		}
	} 
	
	
	var throwCard = function(){
		for(var i = 39; i < 52; i++ ){
			cardBox[i].element.removeEventListener('click', throwCard);
		}
		
		var valid;
		
		var pos = parseInt(this.id)-39;
		youPlayed = yourHand.getCard(pos);
		
		if(thrownCards[round] != 0){
			valid = rule.checkValidity(thrownCards[round], yourHand, youPlayed); 
		}
				
		if(valid == false){
			youThrowCard();
		}else{
			thrownCards[round].push(youPlayed);
			var imageValue = youPlayed.getImgValue();
			
			var index = yourHand.getPosition(youPlayed);
			subGameView.removeChildNodes(39 + index);
		
			if(sound){
				var snd = new Audio('sounds/throw.mp3');
				snd.play();
			}
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
		
		if(sound){
			var snd = new Audio('sounds/throw.mp3'); 
			snd.play();
		}
		
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
		
		if(sound){
			var snd = new Audio('sounds/throw.mp3');
			snd.play();
		}
		
		animator.init(p2CardValue, 3);
		animator.animate('top', 250, 200);
			
		subGameView.removeChildNodes(13 + index);
		subGameView.throwCard(p2CardValue, throwingPos);
		throwingPos++;
	}
	
	
	var aIThrowCardP3 = function(){
		var p3CardValue = p3Played.getImgValue();
		var index = player3.getPosition(p3Played);
		
		if(sound){
			var snd = new Audio('sounds/throw.mp3');
			snd.play();
		}
		
		player3.removePlayerCard(p3Played);
		animator.init(p3CardValue,4);
		animator.animate('left', 375, 200);
				
		subGameView.removeChildNodes(26 + index);
		subGameView.throwCard(p3CardValue, throwingPos);
		throwingPos++;
	}
	
	
	var finishRound = function(){
		aIPlayer1.addThrownCards(thrownCards[round]);
		aIPlayer2.addThrownCards(thrownCards[round]);
		aIPlayer3.addThrownCards(thrownCards[round]);
		
		var won = rule.winCheck(youPlayed, p1Played, p2Played, p3Played, thrownCards[round]);
		turn = won - 1;
		round++;
		
		subGameView.clearPlayingArea();
		
		if(sound){
			var snd = new Audio('sounds/win.mp3'); 
			snd.play();
		}
		
		if(won == 1){
			animator.init(0, 0);
			animator.animate('top', 250, 200);
			
			you.increaseWonHands();
			subGameView.updateHandsWon(won, you.getWonHands());
		}else if(won == 2){
			animator.init(0, 0);
			animator.animate('left', 425, 200);
			
			aIPlayer1.increaseWonHands();
			subGameView.updateHandsWon(won, aIPlayer1.getWonHands());
		}else if(won == 3){
			animator.init(0, 0);
			animator.animate('top', -250, 200);
			
			aIPlayer2.increaseWonHands();
			subGameView.updateHandsWon(won, aIPlayer2.getWonHands());
		}else{
			animator.init(0, 0);
			animator.animate('left', -425, 200);
			
			aIPlayer3.increaseWonHands();
			subGameView.updateHandsWon(won, aIPlayer3.getWonHands());
		}
		startRound();
		timer = 0;
	}
		
	
	var finish = function(){
		finalScore.setScore(aIPlayer1.getWonHands(), aIPlayer2.getWonHands(), aIPlayer3.getWonHands(), you.getWonHands());
		
		subGameView.updateFinalScore();
	}
}