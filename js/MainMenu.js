function MainMenu(){
	var mainBox, newGameBtn, closeGameBtn, soundBtn, difficultyBtn;
	var buttonsBoxWrp, buttonsBox, buttonsList;
	var difficulty = 2, sound = true;
	
	this.init = function(){
		mainBox = new Element();
		mainBox.create('div');
		mainBox.addClass('main-box');
		mainBox.addClass('menu-box');
			
		buttonsBoxWrp = new Element();
		buttonsBoxWrp.create('div');
		buttonsBoxWrp.addClass('button-box-wrp');
		
		buttonsBox = new Element();
		buttonsBox.create('div');
		buttonsBox.addClass('button-box');
		
		buttonsList = new Element();
		var buttonList1 = new Element();
		var buttonList2 = new Element();
		var buttonList3 = new Element();
		var buttonList4 = new Element();
		
		buttonsList.create('ul');
		buttonList1.create('li');
		buttonList2.create('li');
		buttonList3.create('li');
		buttonList4.create('li');
		
		buttonList1.addClass('button-list');
		buttonList2.addClass('button-list');
		buttonList3.addClass('button-list');
		buttonList4.addClass('button-list');
		buttonsList.addClass('clear-fix');
		
		newGameBtn = new Element();
		newGameBtn.create('button');
		newGameBtn.addClass('all-btn');
		newGameBtn.addClass('menu-btn');
		newGameBtn.addText('NEW GAME');
		newGameBtn.element.addEventListener('click', startGame);
		
		difficultyBtn = new Element();
		difficultyBtn.create('button');
		difficultyBtn.addClass('all-btn');
		difficultyBtn.addClass('menu-btn');
		difficultyBtn.addText('DIFFICULTY');
		difficultyBtn.element.addEventListener('click',difficultyLevel);
		
		soundBtn = new Element();
		soundBtn.create('button');
		soundBtn.addClass('all-btn');
		soundBtn.addClass('menu-btn');
		soundBtn.addText('SOUNDS');
		soundBtn.element.addEventListener('click', soundSettings);
		
		closeGameBtn = new Element();
		closeGameBtn.create('button');
		closeGameBtn.addClass('all-btn');
		closeGameBtn.addClass('close-btn');
		closeGameBtn.addClass('menu-btn');
		closeGameBtn.addText('EXIT');
		closeGameBtn.element.addEventListener('click', closeGame);
		
		closeGameBtn.appendTo(buttonList4.element);
		soundBtn.appendTo(buttonList3.element);
		difficultyBtn.appendTo(buttonList2.element);
		newGameBtn.appendTo(buttonList1.element);
		buttonList1.appendTo(buttonsList.element);
		buttonList2.appendTo(buttonsList.element);
		buttonList3.appendTo(buttonsList.element);
		buttonList4.appendTo(buttonsList.element);
		buttonsList.appendTo(buttonsBox.element);
		buttonsBox.appendTo(buttonsBoxWrp.element);
		buttonsBoxWrp.appendTo(mainBox.element);
		mainBox.appendTo(document.body);
	}
	
	var startGame = function(){
		mainBox.removeFrom(document.body);
		var main = MainGame.getInstance();
		main.initScoreDiv();
		main.initGame(difficulty, sound);
	}
	
	var difficultyLevel = function(){
		buttonsBoxWrp.setStyle('display','none');
		
		var diffBox = new Element();
		diffBox.create('div');
		diffBox.addClass('submenu-box');
		
		
		var diffText = new Element();
		diffText.create('div');
		diffText.addClass('submenu-heading');
		diffText.addText('SELECT DIFFICULTY');
		
		
		var medium = new Element();
		medium.create('div');
		medium.addClass('submenu-items');
		if(difficulty == 2)
			medium.addClass('selected');
		medium.addText('INTERMEDIATE');
		
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
		closeBtn.setStyle('margin-left', '105px');
		closeBtn.setStyle('margin-top', '90px');
		closeBtn.addText('CLOSE');
		
		closeBtn.element.addEventListener('click', function(){
			diffBox.removeElements();
			buttonsBoxWrp.setStyle('display','');
		});
		
		diffText.appendTo(diffBox.element);
		medium.appendTo(diffBox.element);
		low.appendTo(diffBox.element);
		closeBtn.appendTo(diffBox.element);
		diffBox.appendTo(mainBox.element);
		
	}
	
	
	var soundSettings = function(){
		buttonsBoxWrp.setStyle('display','none');
		var soundBox = new Element();
		soundBox.create('div');
		soundBox.addClass('submenu-box');
		
		var soundText = new Element();
		soundText.create('div');
		soundText.addClass('submenu-heading');
		soundText.addText('SOUND');
	
		var soundOn = new Element();
		soundOn.create('div');
		soundOn.addClass('submenu-items');
		soundOn.addText('ON');
		if(sound)
			soundOn.addClass('selected');
		
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
		closeBtn.setStyle('margin-left', '105px');
		closeBtn.setStyle('margin-top', '90px');
		closeBtn.addText('CLOSE');
		
		closeBtn.element.addEventListener('click', function(){
			soundBox.removeElements();
			buttonsBoxWrp.setStyle('display','');
		});
		
		soundText.appendTo(soundBox.element);
		soundOff.appendTo(soundBox.element);
		soundOn.appendTo(soundBox.element);
		closeBtn.appendTo(soundBox.element);
		soundBox.appendTo(mainBox.element);
	}
	
	var closeGame = function(){
		mainBox.removeFrom(document.body);
		close();
	}

}