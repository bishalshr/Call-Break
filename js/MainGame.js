
var MainGame = (function(){
	function MainGame(){
		var subGame, totalTable, wholeRound = 0, finalScore;
		this.closeBtn, this.nextRoundBtn, this.newGameBtn, this.scoreDiv, this.table;
		this.yourTotal, this.p1Total, this.p2Total, this.p3Total;
	
		var that = this;
		this.initScoreDiv = function(){
			
			wholeRound = 0;
			finalScore = new Score();
			that.scoreDiv = new Element();
			that.scoreDiv.create('div');
			that.scoreDiv.addClass('score');
		
			createTable();
			
			that.scoreDiv.appendElement(that.table);
			that.scoreDiv.appendElement(totalTable);
		
			that.nextRoundBtn = new Element();
			that.nextRoundBtn.create('button');
			that.closeBtn = new Element();
			that.closeBtn.create('button');
		
			that.nextRoundBtn.addClass('next-button');
			that.closeBtn.addClass('next-button close-btn');
		
			that.nextRoundBtn.addText('Play Next Round');
			that.closeBtn.addText('Close');
			
			that.scoreDiv.appendElement(that.nextRoundBtn);
			that.scoreDiv.appendElement(that.closeBtn);
		
			that.nextRoundBtn.element.addEventListener('click', newRound);
			that.closeBtn.element.addEventListener('click', closeScore);
		
			that.scoreDiv.appendTo(document.body);
		
			that.newGameBtn = new Element();
			that.newGameBtn.create('button');
			that.newGameBtn.addText('New Game');
			that.newGameBtn.addClass('next-button newgame-btn');
			that.scoreDiv.appendElement(that.newGameBtn);
		}
	
	
		this.initGame = function(){
			subGame = new SubGame(finalScore);
			subGame.setWholeRound(wholeRound);
			subGame.init();
		}				

	
		var closeScore = function(){
			that.scoreDiv.setStyle('display','none');
			that.nextRoundBtn.setStyle('display', 'none');
		}
	
	
		var newRound = function(){
			wholeRound = subGame.getWholeRound();
			
			that.scoreDiv.setStyle('display', 'none');
			that.newGameBtn.setStyle('display', 'none');
			that.initGame();
			
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
		
			that.table.setStyle('border','1px solid white');
			that.table.setStyle('width', '550 px');
		
			tr.appendElement(td5);
			tr.appendElement(td1);
			tr.appendElement(td2);
			tr.appendElement(td3);
			tr.appendElement(td4);
			that.table.appendElement(tr);
		
			totalTable = new Element(); 
			totalTable.create('table');
		
			var tr2 = new Element();
			tr2.create('tr');
		
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
		
			that.yourTotal.addClass('total-score');
			that.p1Total.addClass('total-score');
			that.p2Total.addClass('total-score');
			that.p3Total.addClass('total-score');
		
			total.addText('Total');
		
			totalTable.setStyle('border', '1px solid white');
			totalTable.setStyle('width', '550px');
		
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