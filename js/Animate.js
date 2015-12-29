function Animator(el, box) {
	var imag;
	this.element = el.element;
	
	var that = this;
	var mainBox = box;
	var flag = 0;
	
	this.init = function(theImage, position){
		imag = theImage;
		flag = 1;
		that.element = document.createElement('img');
		that.element.setAttribute('src','images/'+imag+'.gif');
		that.element.setAttribute('class','img');
		
		if(position == 0){
			that.element.style.left = 425 + 'px';
			that.element.style.top = 250 + 'px';
		}
		else if(position ==1){
			that.element.style.left = 425 + 'px';
			that.element.style.bottom = 10 + 'px';
		}
		else if(position ==2){
			that.element.style.right = 10 + 'px';
			that.element.style.top = 250 + 'px';
		}
		else if(position ==3){
			that.element.style.left = 425 + 'px';
			that.element.style.top = 10 + 'px';
		}
		else if(position ==4){
			that.element.style.left = 10 + 'px';
			that.element.style.top = 250 + 'px';
		}
		
		mainBox.element.appendChild(that.element);
	}
	this.animate = function(cssProperty, value, duration) {
		var style = window.getComputedStyle(that.element);
		var initial = style.getPropertyValue(cssProperty);
		initial = parseInt(initial);


		var step = value  / (duration / 10);
		var counter = 0;
		var intervalId = setInterval(function() {
			counter++;
			var current = step * counter;
			// element.innerHTML = current;
			that.element.style[cssProperty] = initial + current + 'px';
			
			if (counter >= duration/10){
				clearInterval(intervalId);
				if(flag == 1)
					mainBox.element.removeChild(that.element);
				
			}
				
		}, 10);
	}
	
}