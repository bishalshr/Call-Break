var MainGame = (function(){
	function MainGame(){
		var subGame;
		
		var totalTable;
		var finalScore; 
		
		var difficulty;
		var sound;
		
		this.closeBtn;
		this.nextRoundBtn;
		this.mainMenuBtn;
		
		this.scoreDiv;
		this.table;
		
		this.yourTotal;
		this.p1Total;
		this.p2Total;
		this.p3Total;
		
		this.wholeRound;
		
		var that = this;
		
		
		this.initScoreDiv = function(){
			that.wholeRound = 0;
			
			finalScore = new Score();
			
			that.scoreDiv = new Element('div');
			that.scoreDiv.addClass('score');
		
			createTable();
			
			that.nextRoundBtn = new Element('button');
			that.nextRoundBtn.addClass('next-button');
			that.nextRoundBtn.addText('Play Next Round');
					
			that.closeBtn = new Element('button');
			that.closeBtn.addClass('next-button');
			that.closeBtn.addText('Close');
			
			that.mainMenuBtn = new Element('button');
			that.mainMenuBtn.addText('Main Menu');
			that.mainMenuBtn.addClass('next-button');
			that.mainMenuBtn.addClass('newgame-btn');
			
			that.scoreDiv.appendElement(that.table);
			that.scoreDiv.appendElement(totalTable);
			that.scoreDiv.appendElement(that.nextRoundBtn);
			that.scoreDiv.appendElement(that.closeBtn);
			that.scoreDiv.appendElement(that.mainMenuBtn);
			that.scoreDiv.appendTo(document.body);
		
			that.closeBtn.element.addEventListener('click', closeScore);
		}
	
	
		this.initGame = function(diff, mus){
			if(diff){
				difficulty = diff;
				sound = mus;
			}
			subGame = new SubGame(finalScore, difficulty, sound);
			subGame.setWholeRound(that.wholeRound);
			subGame.init();
		}				

	
		var closeScore = function(){
			that.scoreDiv.setStyle('display','none');
			that.nextRoundBtn.setStyle('display', 'none');
		}
	
		
		var createTable = function(){
			that.table = new Element('table');
			that.table.addClass('score-table');
		
			var tr = new Element('tr');
			var td1 = new Element('td');
			var td2 = new Element('td');
			var td3 = new Element('td');
			var td4 = new Element('td');
			var td5 = new Element('td');
		
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
		
			totalTable = new Element('table'); 
			totalTable.setStyle('width', '550px');
				
			var tr2 = new Element('tr');
			tr2.addClass('total-score');
		
			that.yourTotal = new Element('td');
			that.p1Total = new Element('td');
			that.p2Total = new Element('td');
			that.p3Total = new Element('td');
		
			var total = new Element('td');
			total.addText('Total');
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