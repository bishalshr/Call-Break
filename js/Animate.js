function Animator(el, box) {
	var image;
	var newElement = el;
	var mainBox = box;
	var flag = 0;
	
	
	this.init = function(theImage, position){
		image = theImage;
		flag = 1;
		
		newElement = new Element('img'); 
		newElement.setAttribute('src','images/'+image+'.gif');
		newElement.addClass('img');
		
		if(position == 0){
			newElement.setStyle('left', 425);
			newElement.setStyle('top', 250);
		}else if(position == 1){
			newElement.setStyle('left', 425);
			newElement.setStyle('bottom', 10);
		}else if(position == 2){
			newElement.setStyle('right', 10);
			newElement.setStyle('top', 250);
		}else if(position == 3){
			newElement.setStyle('left', 425);
			newElement.setStyle('top', 10);
		}else if(position == 4){
			newElement.setStyle('left', 10);
			newElement.setStyle('top', 250);
		}
		newElement.appendTo(mainBox.element);
	}
	
	
	this.animate = function(cssProperty, value, duration) {
		var style = window.getComputedStyle(newElement.element);
		var initial = style.getPropertyValue(cssProperty);
		initial = parseInt(initial);

		var step = value  / (duration / 10);
		var counter = 0;
		
		var intervalId = setInterval(function() {
			counter++;
			var current = step * counter;
			newElement.setStyle(cssProperty, initial + current);
			
			if (counter >= duration/10){
				clearInterval(intervalId);
				
				if(flag == 1){
					mainBox.removeChildElement(newElement);
					mainBox.removeImages();
				}
			}
		}, 10);
	} 
}