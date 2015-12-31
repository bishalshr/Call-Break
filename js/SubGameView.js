function SubGameView(finalScore, diff, music){
	var mainBox;
	var boxes = [];
	var cardBox = [];
	
	var difficulty = diff;
	var sound = music;
	var	playerInfo;
	var playingArea;
	var playedCards = [];
	var playedCardsImg = [];
	var playerInput;
	
	var	callHandSelect;
	var handsCalled = [];
	var handsWon = [];
	
	var flag = 0;
	
	var mainGame = MainGame.getInstance();
	
	var scoreBtn;
	var newBtn = new Element('button');
	newBtn.addClass('all-btn');
		
	
	this.setTable = function(){
		mainBox = new Element('div');
		mainBox.addClass('main-box');
		mainBox.appendTo(document.body);
		return mainBox;
	}
	
	
	this.setChair = function(a, b, c, d){
		var x = 0, y = 0;
		
		var box = new Element('div');
		box.addClass('small-box');
		box.setStyle('left', a, 'px');
		box.setStyle('top', b, 'px');
		box.setStyle('height', c, 'px');
		box.setStyle('width', d, 'px');
		
		playerInfo = new Element('div');
		playerInfo.addClass('player-info');
		
		if(a ==700){
			playerInfo.setStyle('top', 150);
		}else if(b == 10){
			playerInfo.setStyle('left', 150);
			playerInfo.setStyle('bottom', 0);
		}else if(a == 10){
			playerInfo.setStyle('top', 150);
			playerInfo.setStyle('right', 0);
		}else{
			playerInfo.setStyle('left', 150);
		}
		
		var handsCalledSpan = new Element('span');
		var handsWonSpan = new Element('span');
		
		handsCalledSpan.addClass('handsCalled');
		handsWonSpan.addClass('handsWon');
		
		handsCalledSpan.addText('0');
		handsWonSpan.addText('0');
		
		handsCalled.push(handsCalledSpan);
		handsWon.push(handsWonSpan);
		
		var handsCalledNode = new Element('span');
		var handsWonNode = new Element('span');
		
		handsCalledNode.addText('Hands Called:');
		handsWonNode.addText(' Hands Won:');
		
		playerInfo.appendElement(handsCalledNode);
		playerInfo.appendElement(handsCalledSpan);
		playerInfo.appendElement(handsWonNode);
		playerInfo.appendElement(handsWonSpan);
		playerInfo.appendTo(box.element);
		
		for(var i = 0; i <= 12; i++){
			var position = i + (flag * 13);
			
			cardBox[position] = new Element('div');
			cardBox[position].addClass('card-holder');
			cardBox[position].addId(position);
			
			box.addClass('small-box');
			
			if(d == 190){
				if(a == 700){
					cardBox[position].setStyle('right', 0);
				}
				cardBox[position].setStyle('top', y);
				
				y = y + 20;
			}else if(d == 400){
				if(b == 440){
					cardBox[position].setStyle('bottom', 0);
				}
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
		
		playingArea = new Element('div');
		playingArea.addClass('small-box');
		
		playingArea.setStyle('left', 350);
		playingArea.setStyle('top', 250);
		playingArea.setStyle('height', 100);
		playingArea.setStyle('width', 200);
		
		playingArea.appendTo(mainBox.element);
	
		for(i = 0; i < 4; i++){
			playedCards[i] = new Element('div');
			playedCards[i].addClass('small-box');
			playedCards[i].setStyle('left', x);
			playedCards[i].appendTo(playingArea.element);
			
			x = x + 30;
		}
		
	}
	
	
	this.setThrowingArea = function(){	
		for(var i = 0; i < 4; i++){
			var playedCardImage = new Element('img');
			playedCardImage.addClass('img');
			playedCardsImg.push(playedCardImage);
		}
	}
	
	
	this.showAllCardView = function(){
		playerInput = new Element('div');
		playerInput.addClass('player-input');
		playerInput.appendTo(mainBox.element);
		playerInput.appendElement(newBtn);
		
		newBtn.addText('Show & Arrange');
		return newBtn;
	}
	
	
	this.setImage = function(i, position, card, showCard){
		var imgDiv = cardBox[position+(i*13)];
		var img = new Element('img');
		
		if(showCard == false){
			img.setAttribute('src','images/'+0+'.gif');
		}else{
			var imageNum = card.getImgValue();
			img.setAttribute('src','images/'+imageNum+'.gif');
		}
		
		imgDiv.appendElement(img);
	}
	
	
	this.arrangeCardView = function(){
		for(var i = 39; i<=51; i++){
			cardBox[i].removeChildElements();
		}
		playerInput.removeChildElement(newBtn);
	}
	
	
	this.callHandView = function(){
		callHandSelect = new Element('select');
		callHandSelect.addClass('select-hand');
		
		callHandText = new Element('span');
		callHandText.addText('Call Hands : ');
		
		newBtn.addText('DONE');
		
		for(var i = 1; i <= 8; i++){
			var options = new Element('option');
			options.setAttribute('value', i);
			
			var textNode = new Element('span');
			textNode.addText(i);
						
			options.appendElement(textNode);
			callHandSelect.appendElement(options);
		}
		
		scoreBtn = new Element('button');
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
			playerInput.removeChildElement(callHandText);
			playerInput.removeChildElement(callHandSelect);
			playerInput.removeChildElement(newBtn);
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
		cardBox[round].removeChildElements();
	}
	
	
	this.updateHandsWon = function(by , qty){
		if(by == 1){
			handsWon[3].addText(qty);
		}else if(by == 2){
			handsWon[0].addText(qty);
		}else if(by == 3){
			handsWon[1].addText(qty);
		}else{
			handsWon[2].addText(qty);
		}
	}
	
	
	this.clearPlayingArea = function(){
		playedCards[0].removeChildElement(playedCardsImg[0]);
		playedCards[1].removeChildElement(playedCardsImg[1]);
		playedCards[2].removeChildElement(playedCardsImg[2]);
		playedCards[3].removeChildElement(playedCardsImg[3]);
	}
	
	
	this.updateFinalScore = function(){
		mainGame.scoreDiv.setStyle('display', 'block');
		mainGame.nextRoundBtn.setStyle('display', 'block');
		mainGame.closeBtn.setStyle('display', 'none');
			
		var wholeRound = mainGame.wholeRound;
		scoreTable = mainGame.table;
		
		var tr = new Element('tr');
		var td0 = new Element('td');
		var td1 = new Element('td');
		var td2 = new Element('td');
		var td3 = new Element('td');
		var td4 = new Element('td');
		
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
			mainBox.removeChildElement(boxes[i]);
		}
		mainBox.removeChildElement(playerInput);
		
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
		
			var resultDiv = new Element('div');
			resultDiv.addClass('result');
			mainGame.scoreDiv.appendElement(resultDiv);
			
			if(yourTotal > p1Total && yourTotal > p2Total && yourTotal > p3Total){
				resultDiv.addText('YOU WON!!!');
			}else{ 
				resultDiv.addText('YOU 	LOST!!!');
			}
		}
	}
	
	
	var mainMenu = function(){
		mainBox.remove();
		mainGame.scoreDiv.remove();
		
		var mainMenu = new MainMenu();
		mainMenu.init(difficulty, sound);
			
		mainGame.mainMenuBtn.element.removeEventListener('click', mainMenu);
		
	}
	
	
	var newRound = function(){
		mainBox.remove();
		mainGame.wholeRound++;
			
		mainGame.scoreDiv.setStyle('display', 'none');
		
		mainGame.initGame();
		mainGame.mainMenuBtn.element.removeEventListener('click', mainMenu);
		mainGame.nextRoundBtn.element.removeEventListener('click', newRound);
	}
}