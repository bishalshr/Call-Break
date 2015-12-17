function Animator() {
	var imag, card;
	var mainBox = document.getElementsByClassName('main-box')[0];
	
	this.init = function(theImage, position){
		imag = theImage;
		card = document.createElement('img');
		card.setAttribute('src','images/'+imag+'.gif');
		card.setAttribute('class','img');
		
		if(position == 0){
			card.style.left = 425 + 'px';
			card.style.top = 250 + 'px';
		}
		else if(position ==1){
			card.style.left = 425 + 'px';
			card.style.bottom = 10 + 'px';
		}
		else if(position ==2){
			card.style.right = 10 + 'px';
			card.style.top = 250 + 'px';
		}
		else if(position ==3){
			card.style.left = 425 + 'px';
			card.style.top = 10 + 'px';
		}
		else if(position ==4){
			card.style.left = 10 + 'px';
			card.style.top = 250 + 'px';
		}
		
		mainBox.appendChild(card);
	}
	this.animate = function(cssProperty, value, duration) {
		var style = window.getComputedStyle(card);
		var initial = style.getPropertyValue(cssProperty);
		initial = parseInt(initial);


		var step = value  / (duration / 50);
		var counter = 0;
		var intervalId = setInterval(function() {
			counter++;
			var current = step * counter;
			// element.innerHTML = current;
			card.style[cssProperty] = initial + current + 'px';
			
			if (counter >= duration/50){
				clearInterval(intervalId);
				mainBox.removeChild(card);
				
			}
				
		}, 1);
	}
	
}