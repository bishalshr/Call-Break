function MainGame(){
	var subGame, table, totalTable, scoreDiv;
	
	var that = this;
	this.initScoreDiv = function(){
		
		scoreDiv = new Box();
		scoreDiv.addClass('score');
		
		createTable();
		scoreDiv.element.appendChild(table);
		scoreDiv.element.appendChild(totalTable);
		
		var nextRoundBtn = document.createElement('button');
		nextRoundBtn.setAttribute('class', 'next-button');
		nextRoundBtn.innerHTML = 'Play Next Round';
		scoreDiv.element.appendChild(nextRoundBtn);
		nextRoundBtn.addEventListener('click', newRound);
		
		scoreDiv.appendTo(document.body);
	}
	this.initGame = function(){
		subGame = new SubGame();
		subGame.init();
		setTimeout(subGame.start,3000);
	}				

	var newRound = function(){
	
		scoreDiv.element.style.display = 'none';
		document.getElementsByClassName('newgame-btn')[0].style.display = 'none';
		that.initGame();
	}
	
	var createTable = function(){
		
		table = document.createElement('table');
		table.setAttribute('class','score-table');
		wholeRound = 0;
		var tr = document.createElement('tr');
		var td1 = document.createElement('td');
		var td2 = document.createElement('td');
		var td3 = document.createElement('td');
		var td4 = document.createElement('td');
		var td5 = document.createElement('td');
		
		td5.innerHTML = 'S.N.';
		td1.innerHTML = 'Your Score';
		td2.innerHTML = 'Ram';
		td3.innerHTML = 'Shyam';
		td4.innerHTML = 'Hari';
		
		table.style.border = '1px solid white';
		table.style.width = '550px';
		
		tr.appendChild(td5);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		table.appendChild(tr);
		
		totalTable = document.createElement('table');
		var tr2 = document.createElement('tr');
		var yourTotal = document.createElement('td');
		var p1Total = document.createElement('td');
		var p2Total = document.createElement('td');
		var p3Total = document.createElement('td');
		var total = document.createElement('td');
		
		yourTotal.setAttribute('class','total-score');
		p1Total.setAttribute('class','total-score');
		p2Total.setAttribute('class','total-score');
		p3Total.setAttribute('class','total-score');
		
		total.innerHTML = 'Total';
		td1.innerHTML = 'Your Score';
		td2.innerHTML = 'Ram';
		td3.innerHTML = 'Shyam';
		td4.innerHTML = 'Hari';
		
		totalTable.style.border = '1px solid white';
		totalTable.style.width = '550px';
		
		tr2.appendChild(total);
		tr2.appendChild(yourTotal);
		tr2.appendChild(p1Total);
		tr2.appendChild(p2Total);
		tr2.appendChild(p3Total);
		totalTable.appendChild(tr2);
		
	}

}