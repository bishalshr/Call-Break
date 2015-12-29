function MainMenu(){
	var mainBox, newGameBtn, closeGameBtn, soundBtn, difficultyBtn;
	var buttonsBox, buttonBox, buttonLists;
	var difficulty = 2, sound = true;
	
	this.init = function(){
		mainBox = new Element();
		mainBox.create('div');
		mainBox.addClass('main-box');
		mainBox.addClass('menu-box');
		mainBox.appendTo(document.body);
		
		buttonsBox = new Element();
		buttonsBox.create('div');
		buttonsBox.addClass('button-box-wrp');
		buttonsBox.appendTo(mainBox.element);
		
		buttonBox = new Element();
		buttonBox.create('div');
		buttonBox.addClass('button-box');
		buttonBox.appendTo(buttonsBox.element);
		
		buttonLists = new Element();
		buttonLists.create('ul');
		var buttonList1 = new Element();
		buttonList1.create('li');
		var buttonList2 = new Element();
		buttonList2.create('li');
		var buttonList3 = new Element();
		buttonList3.create('li');
		var buttonList4 = new Element();
		buttonList4.create('li');
		
		buttonList1.addClass('button-list');
		buttonList1.appendTo(buttonLists.element);
		buttonList2.addClass('button-list');
		buttonList2.appendTo(buttonLists.element);
		buttonList3.addClass('button-list');
		buttonList3.appendTo(buttonLists.element);
		buttonList4.addClass('button-list');
		buttonList4.appendTo(buttonLists.element);
		
		buttonLists.addClass('clear-fix');
		buttonLists.appendTo(buttonBox.element);
		
		newGameBtn = new Element();
		newGameBtn.create('button');
		newGameBtn.addClass('all-btn');
		newGameBtn.addClass('menu-btn');
		newGameBtn.addText('NEW GAME');
		newGameBtn.appendTo(buttonList1.element);
		newGameBtn.element.addEventListener('click', startGame);
		
		difficultyBtn = new Element();
		difficultyBtn.create('button');
		difficultyBtn.addClass('all-btn');
		difficultyBtn.addClass('menu-btn');
		difficultyBtn.addText('DIFFICULTY');
		difficultyBtn.appendTo(buttonList2.element);
		difficultyBtn.element.addEventListener('click',difficultyLevel);
		
		soundBtn = new Element();
		soundBtn.create('button');
		soundBtn.addClass('all-btn');
		soundBtn.addClass('menu-btn');
		soundBtn.addText('SOUNDS');
		soundBtn.appendTo(buttonList3.element);
		soundBtn.element.addEventListener('click', soundSettings);
		
		closeGameBtn = new Element();
		closeGameBtn.create('button');
		closeGameBtn.addClass('all-btn');
		closeGameBtn.addClass('close-btn');
		closeGameBtn.addClass('menu-btn');
		closeGameBtn.addText('EXIT');
		closeGameBtn.appendTo(buttonList4.element);
		closeGameBtn.element.addEventListener('click', closeGame);
		}
	
	var startGame = function(){
		//var callBreak = new CallBreak(difficulty, sound);
		mainBox.removeFrom(document.body);
		var main = MainGame.getInstance();
		main.initScoreDiv();
		main.initGame(difficulty, sound);
		//callBreak.init();
	}
	
	var difficultyLevel = function(){
		buttonsBox.setStyle('display','none');
		var diffBox = new Element();
		diffBox.create('div');
		diffBox.addClass('submenu-box');
		diffBox.appendTo(mainBox.element);
		
		var diffText = new Element();
		diffText.create('div');
		diffText.addClass('submenu-heading');
		diffText.addText('SELECT DIFFICULTY');
		diffText.appendTo(diffBox.element);
		
		var medium = new Element();
		medium.create('div');
		medium.addClass('submenu-items');
		if(difficulty == 2)
			medium.addClass('selected');
		medium.addText('INTERMEDIATE');
		medium.appendTo(diffBox.element);
		medium.element.addEventListener('click', function(){
			medium.addClass('selected');
			low.removeClass('selected');
			difficulty = 2;
		});
		
		var low = new Element();
		low.create('div');
		low.addClass('submenu-items');
		low.addText('BEGINNER');
		if(difficulty == 1)
			low.addClass('selected');
		low.appendTo(diffBox.element);
		low.element.addEventListener('click', function(){
			low.addClass('selected');
			medium.removeClass('selected');
			difficulty = 1;
		});
		
		var closeBtn = new Element();
		closeBtn.create('button');
		closeBtn.addClass('all-btn');
		closeBtn.addClass('close-btn');
		closeBtn.addClass('menu-btn');
		closeBtn.setStyle('margin-left', '120px');
		closeBtn.setStyle('margin-top', '90px');
		closeBtn.addText('CLOSE');
		closeBtn.appendTo(diffBox.element);
		closeBtn.element.addEventListener('click', function(){
			diffBox.removeElements();
			buttonsBox.setStyle('display','');
		});
	}
	
	
	var soundSettings = function(){
		buttonsBox.setStyle('display','none');
		var soundBox = new Element();
		soundBox.create('div');
		soundBox.addClass('submenu-box');
		soundBox.appendTo(mainBox.element);
		
		var soundText = new Element();
		soundText.create('div');
		soundText.addClass('submenu-heading');
		soundText.addText('SOUND');
		soundText.appendTo(soundBox.element);
		
		var soundOn = new Element();
		soundOn.create('div');
		soundOn.addClass('submenu-items');
		soundOn.addText('ON');
		if(sound)
			soundOn.addClass('selected');
		soundOn.appendTo(soundBox.element);
		soundOn.element.addEventListener('click', function(){
			soundOn.addClass('selected');
			soundOff.removeClass('selected');
			sound = true;
		});
		
		var soundOff = new Element();
		soundOff.create('div');
		soundOff.addClass('submenu-items');
		soundOff.addText('OFF');
		if(!sound)
			soundOff.addClass('selected');
		soundOff.appendTo(soundBox.element);
		soundOff.element.addEventListener('click', function(){
			soundOff.addClass('selected');
		
			soundOn.removeClass('selected');
			sound = false;
		});
		
		var closeBtn = new Element();
		closeBtn.create('button');
		closeBtn.addClass('all-btn');
		closeBtn.addClass('close-btn');
		closeBtn.addClass('menu-btn');
		closeBtn.setStyle('margin-left', '120px');
		closeBtn.setStyle('margin-top', '90px');
		closeBtn.addText('CLOSE');
		closeBtn.appendTo(soundBox.element);
		closeBtn.element.addEventListener('click', function(){
			soundBox.removeElements();
			buttonsBox.setStyle('display','');
		});
	}
	
	var closeGame = function(){
		mainBox.removeFrom(document.body);
		close();
	}

}