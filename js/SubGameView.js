function SubGameView(finalScore){
	var mainBox, boxes = [], cardBox = [];
	var	playerInfo, playingArea, playedCards = [], playedCardsImg = [], playerInput;
	var	callHandSelect, handsCalled = [] , handsWon = [];
	var flag = 0;
	var scoreBtn;
	var mainGame = MainGame.getInstance();
		
	var newBtn = new Element();
	newBtn.create('button');
	newBtn.addClass('all-btn');
		
	
	this.setTable = function(){
		mainBox = new Element();
		mainBox.create('div');
		mainBox.addClass('main-box');
		mainBox.appendTo(document.body);
		return mainBox;
	}
	
	
	this.setChair = function(a, b, c, d){
		var x = 0, y = 0;
		
		var box = new Element();
		box.create('div');
		box.addClass('small-box');
		
		box.setStyle('left', a, 'px');
		box.setStyle('top', b, 'px');
		box.setStyle('height', c, 'px');
		box.setStyle('width', d, 'px');
		
		playerInfo = new Element();
		playerInfo.create('div');
		playerInfo.addClass('player-info');
		
		if(a ==700)
			playerInfo.setStyle('top', 150);
			
		else if(b == 10){
			playerInfo.setStyle('left', 150);
			playerInfo.setStyle('bottom', 0);
		}
		
		else if(a == 10){
			playerInfo.setStyle('top', 150);
			playerInfo.setStyle('right', 0);
		}
		
		else{
			playerInfo.setStyle('left', 150);
		}
		
		var handsCalledSpan = new Element();
		var handsWonSpan = new Element();
		
		handsCalledSpan.create('span');
		handsWonSpan.create('span');
		
		handsCalledSpan.addClass('handsCalled');
		handsWonSpan.addClass('handsWon');
		
		handsCalledSpan.addText('0');
		handsWonSpan.addText('0');
		
		handsCalled.push(handsCalledSpan);
		handsWon.push(handsWonSpan);
		
		var handsCalledNode = new Element();
		var handsWonNode = new Element();
		
		handsCalledNode.create('span');
		handsWonNode.create('span');
		
		handsCalledNode.addText('Hands Called:');
		handsWonNode.addText(' Hands Won:');
		
		playerInfo.appendElement(handsCalledNode);
		playerInfo.appendElement(handsCalledSpan);
		playerInfo.appendElement(handsWonNode);
		playerInfo.appendElement(handsWonSpan);
		
		playerInfo.appendTo(box.element);
		
		for(var i = 0; i <= 12; i++){
			var position = i + (flag * 13);
			
			cardBox[position] = new Element();
			cardBox[position].create('div');
			cardBox[position].addClass('card-holder');
			cardBox[position].addId(position);
			
			box.addClass('small-box');
			
			if(d == 190){
				
				if(a == 700)
					cardBox[position].setStyle('right', 0);
				
				cardBox[position].setStyle('top', y);
				
				y = y + 20;
			}
			else if(d == 400){
				
				if(b == 440)
					cardBox[position].setStyle('bottom', 0);
				
				cardBox[position].setStyle('left', x);
				
				x = x + 25;
			}
			cardBox[position].appendTo(box.element);	
		}
		
		flag++;
		boxes.push(box);
		box.appendTo(mainBox.element);
		return cardBox;
	}
	
	
	this.setPlayingArea = function(){
		var x = 0;
		
		playingArea = new Element();
		playingArea.create('div');
		playingArea.addClass('small-box');
		
		playingArea.setStyle('left', 350);
		playingArea.setStyle('top', 250);
		playingArea.setStyle('height', 100);
		playingArea.setStyle('width', 200);
		
		playingArea.appendTo(mainBox.element);
	
		for(i = 0; i < 4; i++){
			playedCards[i] = new Element();
			playedCards[i].create('div');
			playedCards[i].addClass('small-box');
			playedCards[i].setStyle('left', x);
			playedCards[i].appendTo(playingArea.element);
			
			x = x + 30;
		}
	}
	
	
	this.setThrowingArea = function(){	
		
		for(var i = 0; i < 4; i++){
			var playedCardImage = new Element();
			playedCardImage.create('img');
			playedCardImage.addClass('img');
			playedCardsImg.push(playedCardImage);
		}
		
	}
	
	
	this.showAllCardView = function(){
		playerInput = new Element();
		playerInput.create('div');
		playerInput.addClass('player-input');
		playerInput.appendTo(mainBox.element);
	
		newBtn.addText('Show & Arrange');
		
		playerInput.appendElement(newBtn);
		
		return newBtn;
	}
	
	
	this.setImage = function(i, position, card, showCard){
		var imgDiv = cardBox[position+(i*13)];
		
		var img = new Element();
		img.create('img');
		
		if(showCard == false)
			img.setAttribute('src','images/'+0+'.gif');
		
		else{
			var imageNum = card.getImgValue();
			img.setAttribute('src','images/'+imageNum+'.gif');
		}
		
		imgDiv.appendElement(img);
		
	}
	
	
	this.arrangeCardView = function(){
		
		for(var i = 39; i<=51; i++){
			cardBox[i].removeChildElement();
		}
		playerInput.removeElement(newBtn);
	}
	
	
	this.callHandView = function(){
		callHandSelect = new Element();
		callHandSelect.create('select');
		callHandSelect.addClass('select-hand');
		
		callHandText = new Element();
		callHandText.create('span');
		callHandText.addText('Call Hands : ');
		
		newBtn.addText('DONE');
		
		for(var i = 1; i <= 8; i++){
			var options = new Element();
			options.create('option');
			
			var textNode = new Element();
			textNode.create('span');
			textNode.addText(i);
			
			options.setAttribute('value', i);
			options.appendElement(textNode);
			callHandSelect.appendElement(options);
		}
		
		scoreBtn = new Element();
		scoreBtn.create('button');
		scoreBtn.addClass('all-btn');
		scoreBtn.addText('See Score');
			
		scoreBtn.element.addEventListener('click', showScore);
		
		playerInput.appendElement(callHandText);
		playerInput.appendElement(callHandSelect);
		playerInput.appendElement(newBtn);
		playerInput.appendElement(scoreBtn);
		
		return callHandSelect;
	}
	
	
	this.setCalledHandsView = function(called, num){
		if(num == 3){
			playerInput.removeElement(callHandText);
			playerInput.removeElement(callHandSelect);
			playerInput.removeElement(newBtn);
		}
		
		handsCalled[num].addText(called);
	}
	
	
	var showScore = function(){
		mainGame.scoreDiv.setStyle('display', 'block');
		
		mainGame.nextRoundBtn.setStyle('display', 'none');
		mainGame.closeBtn.setStyle('display', 'block');
		mainGame.closeBtn.setStyle('left', '40%');
		mainGame.mainMenuBtn.setStyle('left', '50%');
		
		mainGame.mainMenuBtn.element.addEventListener('click', mainMenu);
	}
	
	
	this.throwCard = function(imageValue, imgPosition){
		setTimeout(function(){
			playedCardsImg[imgPosition].setAttribute('src', 'images/' + imageValue + '.gif');
			playedCards[imgPosition].appendElement(playedCardsImg[imgPosition]);	
		}, 200);
	}
	
	
	this.removeChildNodes = function(round){
		cardBox[round].removeChildElement();
	}
	
	
	this.updateHandsWon = function(by , qty){
			
		if(by == 1)
			handsWon[3].addText(qty);
		
		else if(by == 2)
			handsWon[0].addText(qty);
		
		else if(by == 3)
			handsWon[1].addText(qty);
		
		else
			handsWon[2].addText(qty);
	}
	
	
	this.clearPlayingArea = function(){
		playedCards[0].removeElement(playedCardsImg[0]);
		playedCards[1].removeElement(playedCardsImg[1]);
		playedCards[2].removeElement(playedCardsImg[2]);
		playedCards[3].removeElement(playedCardsImg[3]);
	}
	
	
	this.updateFinalScore = function(){
		mainGame.scoreDiv.setStyle('display', 'block');
		mainGame.nextRoundBtn.setStyle('display', 'block');
		mainGame.closeBtn.setStyle('display', 'none');
			
		var wholeRound = mainGame.wholeRound;
		scoreTable = mainGame.table;
		
		var tr = new Element();
		var td0 = new Element();
		var td1 = new Element();
		var td2 = new Element();
		var td3 = new Element();
		var td4 = new Element();
		
		tr.create('tr');
		td0.create('td');
		td1.create('td');
		td2.create('td');
		td3.create('td');
		td4.create('td');
		
		td0.addText(wholeRound + 1);
		td1.addText(finalScore.getYourScore(wholeRound).toFixed(1));
		td2.addText(finalScore.getP1Score(wholeRound).toFixed(1));
		td3.addText(finalScore.getP2Score(wholeRound).toFixed(1));
		td4.addText(finalScore.getP3Score(wholeRound).toFixed(1));
		
		tr.appendElement(td0);
		tr.appendElement(td1);
		tr.appendElement(td2);
		tr.appendElement(td3);
		tr.appendElement(td4);
		
		scoreTable.appendElement(tr);
		
		for(var i = 0; i < boxes.length; i++){
			mainBox.element.removeChild(boxes[i].element);
		}
		
		mainBox.element.removeChild(playerInput.element);
		var yourTotal = finalScore.getYourTotal();
		var p1Total = finalScore.getP1Total();
		var p2Total =	finalScore.getP2Total();
		var p3Total = finalScore.getP3Total();
		
		mainGame.yourTotal.addText(yourTotal.toFixed(1));
		mainGame.p1Total.addText(p1Total.toFixed(1));
		mainGame.p2Total.addText(p2Total.toFixed(1));
		mainGame.p3Total.addText(p3Total.toFixed(1));
		
		mainGame.mainMenuBtn.element.addEventListener('click', mainMenu);
		mainGame.nextRoundBtn.element.addEventListener('click', newRound);
		
				
		if(wholeRound == 4){
			mainGame.nextRoundBtn.setStyle('display', 'none');
			
			mainGame.mainMenuBtn.setStyle('left', '43%');
			mainGame.mainMenuBtn.setStyle('top', '80%');
						
			var resultDiv = new Element();
			resultDiv.create('div');
			resultDiv.addClass('result');
			mainGame.scoreDiv.appendElement(resultDiv);
			
			if(yourTotal > p1Total && yourTotal > p2Total && yourTotal > p3Total){
				resultDiv.addText('YOU WON!!!');
			}
			
			else 
				resultDiv.addText('YOU 	LOST!!!');
		}
	}
	
	
	var mainMenu = function(){
		mainBox.removeElements();
		
		mainGame.scoreDiv.removeFrom(document.body);
		
		var mainMenu = new MainMenu();
		mainMenu.init();
			
		mainGame.mainMenuBtn.element.removeEventListener('click', mainMenu);
		
	}
	
	
	var newRound = function(){
		mainBox.removeElements();
		mainGame.wholeRound++;
			
		mainGame.scoreDiv.setStyle('display', 'none');
		
		mainGame.initGame();
		mainGame.mainMenuBtn.element.removeEventListener('click', mainMenu);
		mainGame.nextRoundBtn.element.removeEventListener('click', newRound);
	}
}

