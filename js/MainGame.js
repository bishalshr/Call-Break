var MainGame = (function(){
	function MainGame(){
		var subGame, totalTable, finalScore; 
		var difficulty, sound;
		this.closeBtn, this.nextRoundBtn, this.mainMenuBtn, this.scoreDiv, this.table;
		this.yourTotal, this.p1Total, this.p2Total, this.p3Total;
		this.wholeRound = 0;
		
		var that = this;
		
		this.initScoreDiv = function(){
			that.wholeRound = 0;
			finalScore = new Score();
			that.scoreDiv = new Element();
			that.scoreDiv.create('div');
			that.scoreDiv.addClass('score');
		
			createTable();
			
			that.scoreDiv.appendElement(that.table);
			that.scoreDiv.appendElement(totalTable);
			
			that.nextRoundBtn = new Element();
			that.nextRoundBtn.create('button');
			that.nextRoundBtn.addClass('next-button');
			that.nextRoundBtn.addText('Play Next Round');
					
			that.closeBtn = new Element();
			that.closeBtn.create('button');
			that.closeBtn.addClass('next-button');
			//that.closeBtn.addClass('close-btn');
			that.closeBtn.addText('Close');
			
			that.scoreDiv.appendElement(that.nextRoundBtn);
			that.scoreDiv.appendElement(that.closeBtn);
		
			that.closeBtn.element.addEventListener('click', closeScore);
		
			that.mainMenuBtn = new Element();
			that.mainMenuBtn.create('button');
			that.mainMenuBtn.addText('Main Menu');
			that.mainMenuBtn.addClass('next-button');
			that.mainMenuBtn.addClass('newgame-btn');
			
			that.scoreDiv.appendElement(that.mainMenuBtn);
			that.scoreDiv.appendTo(document.body);
		}
	
	
		this.initGame = function(diff, mus){
			difficulty = diff;
			sound = mus;
			
			subGame = new SubGame(finalScore, difficulty, sound);
			subGame.setWholeRound(that.wholeRound);
			subGame.init();
		}				

	
		var closeScore = function(){
			that.scoreDiv.setStyle('display','none');
			that.nextRoundBtn.setStyle('display', 'none');
		}
	
		var createTable = function(){
			that.table = new Element();
			that.table.create('table');
			that.table.addClass('score-table');
		
			var tr = new Element();
			var td1 = new Element();
			var td2 = new Element();
			var td3 = new Element();
			var td4 = new Element();
			var td5 = new Element();
		
			tr.create('tr');
			td1.create('td');
			td2.create('td');
			td3.create('td');
			td4.create('td');
			td5.create('td');
		
			td5.addText('S.N.');
			td1.addText('Your Score');
			td2.addText('Ram');
			td3.addText('Shyam');
			td4.addText('Hari');
			
			td1.addClass('score-header');
			td2.addClass('score-header');
			td3.addClass('score-header');
			td4.addClass('score-header');
			td5.addClass('score-header');
		
			that.table.setStyle('width', '550 px');
		
			tr.appendElement(td5);
			tr.appendElement(td1);
			tr.appendElement(td2);
			tr.appendElement(td3);
			tr.appendElement(td4);
			that.table.appendElement(tr);
		
			totalTable = new Element(); 
			totalTable.create('table');
			totalTable.setStyle('width', '550px');
				
			var tr2 = new Element();
			tr2.create('tr');
			tr2.addClass('total-score');
		
			that.yourTotal = new Element();
			that.p1Total = new Element();
			that.p2Total = new Element();
			that.p3Total = new Element();
		
			that.yourTotal.create('td');
			that.p1Total.create('td');
			that.p2Total.create('td');
			that.p3Total.create('td');
		
			var total = new Element();
			total.create('td');
			total.addText('Total');
		
			tr2.appendElement(total);
			tr2.appendElement(that.yourTotal);
			tr2.appendElement(that.p1Total);
			tr2.appendElement(that.p2Total);
			tr2.appendElement(that.p3Total);
			totalTable.appendElement(tr2);
		}
	}
	var instance;
	
	return{
		getInstance:function(){
			if(instance == null){
				instance = new MainGame();
				instance.constructor = null;
			}
			return instance;
		}
	}
}());