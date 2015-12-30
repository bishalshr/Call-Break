function StartAnimation(){
	var mainBox, textBox, textBox2, textSpan, textSpan2, textSpan3, spadeImg, imageBox;
	var animator;
	
	this.init = function(){
		mainBox = new Element();
		mainBox.create('div');
		mainBox.addClass('main-box');
		mainBox.addClass('menu-start');
		
		textBox = new Element();
		textBox.create('div');
		textBox.addClass('text-box');
		
		textSpan = new Element();
		textSpan.create('span');
		textSpan.addClass('text-span');
		textSpan.addText('TIME TO PLAY');
		
		textBox2 = new Element();
		textBox2.create('div');
		textBox2.addClass('text-box');
		textBox2.addClass('title-box');
		
		imageBox = new Element();
		imageBox.create('div');
		imageBox.addClass('image-box');
		
		textSpan2 = new Element();
		textSpan2.create('span');
		textSpan2.addClass('title-text-span');
		textSpan2.addText('CALL');
		
		textSpan3 = new Element();
		textSpan3.create('span');
		textSpan3.addClass('title-text-span');
		textSpan3.addClass('right');
		textSpan3.addText('BREAK');
		
		textSpan2.appendTo(textBox2.element);
		textSpan3.appendTo(textBox2.element);
		textSpan.appendTo(textBox.element);
		textBox.appendTo(mainBox.element);
		textBox2.appendTo(mainBox.element);
		imageBox.appendTo(mainBox.element);
		mainBox.appendTo(document.body);
		
		animator = new Animator(textSpan, mainBox);
		animator.animate('font-size', 15, 300);
		
		setTimeout(function(){
			animator = new Animator(textSpan2, mainBox);
			animator.animate('left', 412, 400);
		}, 600);
		
		setTimeout(function(){
			animator = new Animator(textSpan3, mainBox);
			animator.animate('left', -475, 400);
		}, 1000);
		
		setTimeout(function(){
			spadeImg = new Element();
			spadeImg.create('img');
			spadeImg.addClass('spade-img');
			spadeImg.setAttribute('src', 'images/spade.png');
			spadeImg.appendTo(imageBox.element);
			
			animator = new Animator(spadeImg, imageBox);
			animator.animate('width', -210, 300);
			animator.animate('height', -210, 300);
		}, 1400);
		
		 setTimeout(function(){
			imageBox.element.removeChild(spadeImg.element);
			imageBox.setStyle('background', 'url("images/spade2.png")');
		}, 1700); 
		
		setTimeout(function(){
			mainBox.removeFrom(document.body);
			
			var mainMenu = new MainMenu();
			mainMenu.init();
		}, 1900);
	}
}