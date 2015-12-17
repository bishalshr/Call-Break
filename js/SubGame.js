function SubGame(){
	var mainBox, chair = [], playerInput, playingArea, scoreDiv;
	var animator , flag = 0, count = 0, intervalId, img = [], cardBox = [], callHandSelect, imgPosition = 0, playedSuit, highCard;
	
	var p1Won = p2Won = p3Won = youWon = 0, p1Played, p2Played, p3Played, youPlayed, turn = 0, round = 0;
	
	var playerInfo = [], playedCards = [], playedCardsImg = [];
	
	var newBtn = document.createElement('button');
	newBtn.setAttribute('class','all-btn');
	
	var player1, player2, player3, your;
	var rule;
	var thrownCards = [];
	for(var i = 0; i < 13; i++){
		thrownCards[i] = [];
	}
	
	var AIPlayer1, AIPlayer2, AIPlayer3, you;
	
		for(var i = 0; i < 4; i++){
			var playedCardImage = document.createElement('img');
			playedCardImage.setAttribute('class', 'img');
			playedCardsImg.push(playedCardImage);
		}
		
	this.init = function(){
		
		setTable();
		
		setChair(700, 110, 400, 190);
		setChair(250, 10, 150, 400);
		setChair(10, 100, 400, 190);
		setChair(250, 440, 150, 400);
		
		setPlayingArea();
		
		setHand();
		setDeck();
		dealCards();
		setTimeout(showAllCard, 3000);
	}
	
	var setTable = function(){
		mainBox = new Box();
		mainBox.addClass('main-box');
		mainBox.appendTo(document.body);
	}
	
	var setChair = function(a, b, c, d){
		var x = 0, y = 0;
		box = new Box();
		box.addClass('small-box');
		box.element.style.left = a + 'px';
		box.element.style.top = b + 'px';
		box.element.style.height = c + 'px';
		box.element.style.width = d + 'px';
		
		var playerInfo = new Box();
		playerInfo.addClass('player-info');
		
		if(a ==700)
			playerInfo.element.style.top =150 + 'px';
		
		else if(b == 10){
			playerInfo.element.style.left = 150 + 'px';
			playerInfo.element.style.bottom = 0 + '%';
		}
		
		else if(a == 10){
			playerInfo.element.style.top =150 + 'px';
			playerInfo.element.style.right =0 + '%';
		}
		
		else{
			playerInfo.element.style.left =150 + 'px';
		}
		
		var handsCalled = document.createElement('span');
		var handsWon = document.createElement('span');
		handsCalled.setAttribute('class','handsCalled');
		handsWon.setAttribute('class', 'handsWon');
		handsCalled.innerHTML = '0';
		handsWon.innerHTML = '0';
		
		var handsCalledNode = document.createTextNode('Hands Called:');
		var handsWonNode = document.createTextNode(' Hands Won:');
		
		playerInfo.element.appendChild(handsCalledNode);
		playerInfo.element.appendChild(handsCalled);
		playerInfo.element.appendChild(handsWonNode);
		playerInfo.element.appendChild(handsWon);
		
		playerInfo.appendTo(box.element);
		for(var i = 0; i <=12; i++){
			var position = i + (flag * 13);
			cardBox[position] = new Box();
			cardBox[position].addClass('small-box');
			box.addClass('small-box');
			cardBox[position].element.setAttribute('id', position);
			
			if(d == 190){
				if(a == 700)
					cardBox[position].element.style.right = 0 + 'px';
				cardBox[position].element.style.top = y + 'px';
				y = y + 20;
			}else if(d == 400){
				if(b == 440)
					cardBox[position].element.style.bottom = 0 + 'px';
				cardBox[position].element.style.left = x + 'px';
				x = x + 25;
			}
			cardBox[position].appendTo(box.element);	
		}
		
		flag++;
		box.appendTo(mainBox.element);
		
	}
	
	var setPlayingArea = function(){
		
		var x = 0;
		
		playingArea = new Box();
		playingArea.addClass('small-box');
		playingArea.element.style.left = 350 + 'px';
		playingArea.element.style.top = 250 + 'px';
		playingArea.element.style.height = 100 + 'px';
		playingArea.element.style.width = 200 + 'px';
		playingArea.appendTo(mainBox.element);
	
		for(i = 0; i < 4; i++){
			playedCards[i] = new Box();
			playedCards[i].addClass('small-boxe');
			playedCards[i].element.style.left = x + 'px';
			playedCards[i].element.style.background = 'yellow';
			playedCards[i].appendTo(playingArea.element);
			
			x = x + 30;
		}
	}
	
	var setHand = function(){
		player1 = new Hand(0);
		player2 = new Hand(1);
		player3 = new Hand(2);
		your = new Hand(3);
		
		
	
	}
	
	var setDeck = function(){
		
		var deck = new Deck();
		deck.newDeck();
		deck.shuffle();
		
		for(var i = 0; i < 52; i = i+4){
			your.addCard(deck.dealCard());
			player1.addCard(deck.dealCard());
			player2.addCard(deck.dealCard());
			player3.addCard(deck.dealCard());
		}
		you = new Player(your);
		AIPlayer1 = new AIPlayer(player1);
		AIPlayer2 = new AIPlayer(player2);
		AIPlayer3 = new AIPlayer(player3);
		rule = new Rule(player1, player2, player3, your);
	}
	
	var dealCards = function(){
		count = 0, flag = 0;
		animator = new Animator();
		img[0] = img[1] = img[2] = img [3] = 0;
		intervalId = setInterval(deal, 50);
	
	}
	
	var deal = function(){
		if(count == 52){
			clearInterval(intervalId);
		}
		
		else if(flag == 0){
			animator.init(0,0);
			animator.animate('left', 380, 400);
			player1.setImage(img[0], false);
			//player1.setImage(-1);
			flag++;
			count++;
			img[0]++;
		
		}else if(flag == 1){
			animator.init(0,0);
			animator.animate('top', -150, 400);
			player2.setImage(img[1], false);
			//player2.setImage(-1);
			flag++;
			count++;
			img[1]++;

		}else if(flag == 2){
			animator.init(0,0);
			animator.animate('left', -380, 400);
			player3.setImage(img[2], false);
			//player3.setImage(-1);
			flag++;
			count++;
			img[2]++;

		}else{
			animator.init(0, 0);
			animator.animate('top', 150, 400);
			your.setImage(img[3],false);
			//your.setImage(-1);
			/* for(var i = 0;i <=count/4;i++){
				cardBox(39+i).element.removeEventListener('click');
			} */
			for(var i = 0; i <= count / 4; i++){
				cardBox[39+i].element.addEventListener('click', displayCard);
			}
			flag = 0;
			count++;
			img[3]++;
			
		}
	}
	var displayCard = function(){
		var childElement = this.childNodes;
		this.removeChild(childElement[0]);
		your.setImage(parseInt(this.id)-39, true);
		for(var i = 0; i <= count / 4; i++){
				this.removeEventListener('click', displayCard);
			}
	}
	
	var showAllCard = function(){
		
		playerInput = new Box();
		playerInput.addClass('player-input');
		playerInput.appendTo(mainBox.element);
	
		newBtn.innerHTML = 'Show and Arrange Cards';
		
		playerInput.element.appendChild(newBtn);
		
	
		newBtn.addEventListener('click', arrangeCard);
		
	}
	
	var arrangeCard = function(){
		your.sortByValue();
		for(var i = 39; i<=51; i++){
			var childElement = cardBox[i].element.childNodes;
			cardBox[i].element.removeChild(childElement[0]);
			console.log('1');
			your.setImage(parseInt(cardBox[i].element.id)-39,true);
		}
		newBtn.removeEventListener('click', arrangeCard);
		playerInput.element.removeChild(this);
		callHand();
	}
		
	var callHand = function(){
		callHandSelect = document.createElement('select');
		var callHandText = document.createTextNode('Call Hands : ');
		
		newBtn.innerHTML = 'DONE';
		
		for(var i = 1; i<=8 ;i++){
			var options = document.createElement("option");
			var textNode = document.createTextNode(i);
			options.setAttribute('value', i);
			options.appendChild(textNode);
			callHandSelect.appendChild(options);
		}
		
		playerInput.element.appendChild(callHandText);
		playerInput.element.appendChild(callHandSelect);
		playerInput.element.appendChild(newBtn);
		
		newBtn.addEventListener('click',callNext);
		
	}
	
	var callNext = function(){
		var youCalled = callHandSelect[callHandSelect.selectedIndex].value;
		
		you.setCalledHands(youCalled);
		var handsCall = document.getElementsByClassName('handsCalled');
		
		mainBox.element.removeChild(playerInput.element);
		newBtn.removeEventListener('click',callNext);
		
		var p1Called = AIPlayer1.callHand();
		var p2Called = AIPlayer2.callHand();
		var p3Called = AIPlayer3.callHand();
		
		finalScore.setCalledHands(p1Called, p2Called, p3Called, parseInt(youCalled));
		
		handsCall[3].innerHTML = youCalled;
		handsCall[0].innerHTML = p1Called;
		handsCall[1].innerHTML = p2Called;
		handsCall[2].innerHTML = p3Called;
		
		startRound();
		
	}
	
	




	var startRound = function(){
		imgPosition = 0;
		p1Played = null;
		p2Played = null;
		p3Played = null;
		youPlayed = null;
		playedSuit = 0;
		highCard = null;
		
		console.log(thrownCards[0][0]);
		
		if(round == 13){
			finish();
		}
		else if (turn == 0){
			youThrowCard();
		}
		
		else if(turn == 1){
			p1Played = AIPlayer1.throwCard(thrownCards[round]);
			thrownCards[round].push(p1Played);
			
			playedSuit = p1Played.getSuit();
			
			p2Played = AIPlayer2.throwCard(thrownCards[round]);
			thrownCards[round].push(p2Played);
			
			p3Played = AIPlayer3.throwCard(thrownCards[round]);
			thrownCards[round].push(p3Played);
		
			highCard = rule.checkHighCard(p1Played, p2Played, p3Played, youPlayed, playedSuit);
			AIThrowCardP1();
			setTimeout(AIThrowCardP2,1000);
			setTimeout(AIThrowCardP3,2000);
			setTimeout(youThrowCard,3000);
		}
		
		else if(turn ==2){
			p2Played = AIPlayer2.throwCard(thrownCards[round]);
			playedSuit = p2Played.getSuit();
			thrownCards[round].push(p2Played);
			
			p3Played = AIPlayer3.throwCard(thrownCards[round]);
			thrownCards[round].push(p3Played);
			
		highCard = rule.checkHighCard(p1Played, p2Played, p3Played, youPlayed, playedSuit);
			
			AIThrowCardP2();
			setTimeout(AIThrowCardP3,1000);
			setTimeout(youThrowCard,2000);
		}
		
		else{
			p3Played = AIPlayer3.throwCard(thrownCards[round]);
			playedSuit = p3Played.getSuit();
			thrownCards[round].push(p3Played);
			
			highCard = rule.checkHighCard(p1Played, p2Played, p3Played, youPlayed, playedSuit);
			AIThrowCardP3();
			setTimeout(youThrowCard,1000);
		}
	}
	
	var youThrowCard = function(){
		//console.log(highCard ,'lksjdflkj');		
		for(var i = 39; i <52; i++ ){
			cardBox[i].element.addEventListener('click', throwCard);
		}
	} 
	
	var throwCard = function(){
		var childElement = this.childNodes;
		var valid;
		
		var pos = parseInt(this.id)-39;
		youPlayed = your.getCard(pos);
		
		//if(highCard!=null)
		if(turn != 0){
			valid = rule.checkValidity(youPlayed, playedSuit, highCard); 
		}
				
		if(valid == false){
		//	debugger;
			for(var i = 39; i <52; i++ ){
				cardBox[i].element.removeEventListener('click', throwCard);
			}
			youThrowCard();
			
		}
		
		else{
			thrownCards[round].push(youPlayed);
			your.removePlayerCard(youPlayed);
			
			var imageValue = youPlayed.getImgValue();
			playedSuit = youPlayed.getSuit();
			this.removeChild(childElement[0]);
		
			animator.init(imageValue,1);
			animator.animate('bottom', 250, 1000);
		
			playedCardsImg[imgPosition].setAttribute('src', 'images/' + imageValue + '.gif');
			playedCards[imgPosition].element.appendChild(playedCardsImg[imgPosition]);
			imgPosition++;
			
			for(var i = 39; i <52; i++ ){
				cardBox[i].element.removeEventListener('click', throwCard);
			}
		
			if(turn == 0){
				p1Played = AIPlayer1.throwCard(thrownCards[round]);
				thrownCards[round].push(p1Played);
				
				p2Played = AIPlayer2.throwCard(thrownCards[round]);
				thrownCards[round].push(p2Played);
				
				p3Played = AIPlayer3.throwCard(thrownCards[round]);
				thrownCards[round].push(p1Played);
				
				setTimeout(AIThrowCardP1,1000);
				setTimeout(AIThrowCardP2,2000);
				setTimeout(AIThrowCardP3,3000);
		
				setTimeout(finishRound, 4000);
				setTimeout(startRound, 4500);
			}
		
			else if(turn == 1){
				setTimeout(finishRound, 1000);
				setTimeout(startRound, 1500);
		
			}
		
			else if(turn == 2){
				p1Played = AIPlayer1.throwCard(thrownCards[round]);
				thrownCards[round].push(p1Played);
				
				setTimeout(AIThrowCardP1,1000);
			
				setTimeout(finishRound, 2000);
				setTimeout(startRound, 2500);
			}
		
			else{
				p1Played = AIPlayer1.throwCard(thrownCards[round]);
				thrownCards[round].push(p1Played);
				
				p2Played = AIPlayer2.throwCard(thrownCards[round]);
				thrownCards[round].push(p2Played);
				
				setTimeout(AIThrowCardP1,1000);
				setTimeout(AIThrowCardP2,2000);
			
				setTimeout(finishRound, 3000);
				setTimeout(startRound, 3500);
			}
		}
	}
	
	
	var AIThrowCardP1 = function(){
		var p1CardValue = p1Played.getImgValue();
		animator.init(p1CardValue, 2);
		animator.animate('right', 375, 1000);
		
		var childElement = cardBox[round].element.childNodes;
		cardBox[round].element.remove(childElement);
		
		playedCardsImg[imgPosition].setAttribute('src', 'images/' + p1CardValue + '.gif');
		playedCards[imgPosition].element.appendChild(playedCardsImg[imgPosition]);
		imgPosition++;
	}
	
	
	
	var AIThrowCardP2 = function(){
		var p2CardValue = p2Played.getImgValue();
		
		animator.init(p2CardValue, 3);
		animator.animate('top', 250, 1000);
			
		var childElement = cardBox[13 + round].element.childNodes;
		cardBox[13 + round].element.remove(childElement);
		
		playedCardsImg[imgPosition].setAttribute('src', 'images/' + p2CardValue + '.gif');
		playedCards[imgPosition].element.appendChild(playedCardsImg[imgPosition]);
		imgPosition++;
	}
	
	
	
	var AIThrowCardP3 = function(){
		var p3CardValue = p3Played.getImgValue();
		
		var childElement = cardBox[round + 26].element.childNodes;
		cardBox[round + 26].element.remove(childElement);
		
		animator.init(p3CardValue,4);
		animator.animate('left', 375, 1000);
				
		playedCardsImg[imgPosition].setAttribute('src', 'images/' + p3CardValue + '.gif');
		playedCards[imgPosition].element.appendChild(playedCardsImg[imgPosition]); 
		imgPosition++;
	}
	
	
	
	var finishRound = function(){
		var handsWon = document.getElementsByClassName('handsWon');
		
		var won = rule.winCheck(youPlayed, p1Played, p2Played, p3Played);
		turn = won - 1;
		round++;
		
		clearPlayingArea();
		
		if(won == 1){
			animator.init(0, 0);
			animator.animate('top', 250, 1000);
			you.increaseWonHands();
			handsWon[3].innerHTML = you.getWonHands();
		}
		
		else if(won ==2){
			animator.init(0, 0);
			animator.animate('left', 425, 400);
			AIPlayer1.increaseWonHands();
			handsWon[0].innerHTML = AIPlayer1.getWonHands();
		}
		
		else if(won ==3){
			animator.init(0, 0);
			animator.animate('top', -250, 400);
			AIPlayer2.increaseWonHands();
			handsWon[1].innerHTML = AIPlayer2.getWonHands();
		}
		
		else{
			animator.init(0, 0);
			animator.animate('left', -425, 400);
			AIPlayer3.increaseWonHands();
			handsWon[2].innerHTML = AIPlayer3.getWonHands();
		}
	}
	
	
	
	
	
	
	
	var clearPlayingArea = function(){
		
		playedCards[0].element.removeChild(playedCardsImg[0]);
		playedCards[1].element.removeChild(playedCardsImg[1]);
		playedCards[2].element.removeChild(playedCardsImg[2]);
		playedCards[3].element.removeChild(playedCardsImg[3]);
			
	}
	
	var finish = function(){
		
		finalScore.setScore(AIPlayer1.getWonHands(),AIPlayer2.getWonHands(),AIPlayer3.getWonHands(), you.getWonHands());
		
		scoreDiv = document.getElementsByClassName('score')[0];
		//console.log()
		scoreDiv.style.display = 'block';
		document.getElementsByClassName('newgame-btn')[0].style.display = 'block';
		scoreTable = document.getElementsByClassName('score-table')[0];
		
		var tr = document.createElement('tr');
		var td0 = document.createElement('td');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		var td4 = document.createElement('td');
		
		td0.innerHTML = wholeRound + 1;
		td1.innerHTML = finalScore.getYourScore(wholeRound).toFixed(1);
		td2.innerHTML = finalScore.getP1Score(wholeRound).toFixed(1);
		td3.innerHTML = finalScore.getP2Score(wholeRound).toFixed(1);
		td4.innerHTML = finalScore.getP3Score(wholeRound).toFixed(1);
		
		tr.appendChild(td0);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		
		wholeRound++;
				
		scoreTable.appendChild(tr);
		//td5.innerHTML = finalScore.getYourScore();
		var totalScore = document.getElementsByClassName('total-score');
		var yourTotal = finalScore.getYourTotal();
		var p1Total = finalScore.getP1Total();
		var p2Total =	finalScore.getP2Total();
		var p3Total = finalScore.getP3Total();
		
		totalScore[0].innerHTML = yourTotal.toFixed(1);
		totalScore[1].innerHTML = p1Total.toFixed(1);
		totalScore[2].innerHTML = p2Total.toFixed(1);
		totalScore[3].innerHTML = p3Total.toFixed(1);
		
		var childElement = mainBox.element.childNodes;
		for(var i = 0; i <=childElement.length; i++){
			mainBox.element.remove(childElement[i]);
		}
		
		if(wholeRound == 5){
			document.getElementsByClassName('next-button')[0].style.display = 'none';
			var resultDiv = document.createElement('div');
			resultDiv.setAttribute('class', 'result');
			scoreDiv.appendChild(resultDiv);
			if(yourTotal > p1Total && yourTotal > p2Total && yourTotal > p3Total){
				resultDiv.innerHTML = 'YOU WON!!!';
			}
			else 
				resultDiv.innerHTML = 'YOU 	LOST!!!';
		}
	}
}
	