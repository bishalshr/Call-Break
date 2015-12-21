function SubGameView(){
	var mainBox, box, playerInfo, cardBox = [], flag = 0, playingArea, playedCards = [], playedCardsImg = [], playerInput, callHandSelect,  scoreDiv;
	
	var newBtn = document.createElement('button');
	newBtn.setAttribute('class','all-btn');
		
	this.setTable = function(){
		mainBox = new Box();
		mainBox.addClass('main-box');
		mainBox.appendTo(document.body);
	}
	
	
	this.setChair = function(a, b, c, d){
		var x = 0, y = 0;
		
		box = new Box();
		box.addClass('small-box');
		
		box.element.style.left = a + 'px';
		box.element.style.top = b + 'px';
		box.element.style.height = c + 'px';
		box.element.style.width = d + 'px';
		
		playerInfo = new Box();
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
			cardBox[position].addClass('card-holder');
			
			box.addClass('small-box');
			
			cardBox[position].element.setAttribute('id', position);
			
			if(d == 190){
				
				if(a == 700)
					cardBox[position].element.style.right = 0 + 'px';
				
				cardBox[position].element.style.top = y + 'px';
				
				y = y + 20;
			}
			else if(d == 400){
				
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
	
	
	this.setPlayingArea = function(){
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
			playedCards[i].addClass('small-box');
			
			playedCards[i].element.style.left = x + 'px';
			playedCards[i].element.style.background = 'yellow';
			
			playedCards[i].appendTo(playingArea.element);
			
			x = x + 30;
		}
	}
	
	this.setThrowingArea = function(){	
		for(var i = 0; i < 4; i++){
			var playedCardImage = document.createElement('img');
			playedCardImage.setAttribute('class', 'img');
			playedCardsImg.push(playedCardImage);
		}
	}
	
	this.showAllCardView = function(){
		
		playerInput = new Box();
		playerInput.addClass('player-input');
		playerInput.appendTo(mainBox.element);
	
		newBtn.innerHTML = 'Show and Arrange Cards';
		
		playerInput.element.appendChild(newBtn);
		
	}
	
	
	this.setImage = function(i, position, card, showCard){
		/* id = position;
		var showCard = that.getCard(position);
		var imageNum = showCard.getImgValue();
		
		var imgDiv = document.createElement('div');
		var img = document.createElement('img');
		
		img.setAttribute('src','images/'+0+'.gif');
		img.setAttribute('id', 'img' + (id + (playerNum * 13)));
		imgDiv.style.position = 'absolute';
		
		if(playerNum % 2 != 0){
			imgDiv.style.left = x + 'px';
			x = x + 25;
		}
		else {
			imgDiv.style.top = y + 'px';
			y = y + 20;
		}
		
		imgDiv.appendChild(img);
		playerBox.appendChild(imgDiv); */
		var imgDiv = document.getElementById((position+(i*13)));
		
		var img = document.createElement('img');
		if(showCard == false)
			img.setAttribute('src','images/'+0+'.gif');
		else{
			var imageNum = card.getImgValue();
			img.setAttribute('src','images/'+imageNum+'.gif');
		}
		imgDiv.appendChild(img);
		
	}
	
	this.arrangeCardView = function(){
		
		for(var i = 39; i<=51; i++){
			var childElement = cardBox[i].element.childNodes;
			cardBox[i].element.removeChild(childElement[0]);
		}
			
			playerInput.element.removeChild(newBtn);
	}
	
	this.callHandView = function(){
		
		callHandSelect = document.createElement('select');
		callHandSelect.setAttribute('class', 'select-hand');
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
		
		
	}
	
	this.setCalledHandsView = function(called, num){
		
		var handsCall = document.getElementsByClassName('handsCalled');
		
		if(num == 3)
			mainBox.element.removeChild(playerInput.element);
		
		handsCall[num].innerHTML = called;
		
	}
	
	this.throwCard = function(imageValue, imgPosition){
		
		setTimeout(function(){
			playedCardsImg[imgPosition].setAttribute('src', 'images/' + imageValue + '.gif');
			playedCards[imgPosition].element.appendChild(playedCardsImg[imgPosition]);	
		}, 200);
		
	}
	
	
	this.removeChildNodes = function(round){
		
		var childElement = cardBox[round].element.childNodes;
		cardBox[round].element.remove(childElement);
	}
	
	this.updateHandsWon = function(by , qty){
		var handsWon = document.getElementsByClassName('handsWon');
		
		if(by == 1)
			handsWon[3].innerHTML = qty;
		else if(by == 2)
			handsWon[0].innerHTML = qty;
		else if(by == 3)
			handsWon[1].innerHTML = qty;
		else
			handsWon[2].innerHTML = qty;
	}
	
	
	this.clearPlayingArea = function(){
		
		playedCards[0].element.removeChild(playedCardsImg[0]);
		playedCards[1].element.removeChild(playedCardsImg[1]);
		playedCards[2].element.removeChild(playedCardsImg[2]);
		playedCards[3].element.removeChild(playedCardsImg[3]);
			
	}
	
	this.updateFinalScore = function(){
		scoreDiv = document.getElementsByClassName('score')[0];
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

