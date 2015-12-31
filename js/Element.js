function Element(el) {
	this.element = document.createElement(el); 
	var that = this;
	
	
	this.appendTo = function(parentElement) {
		parentElement.appendChild(that.element);
	}
	
	
	this.appendElement = function(childElement){
		that.element.appendChild(childElement.element);
	}
	
	
	this.removeChildElements = function(){
		var childElement = this.element.childNodes;
		
		for(var i = 0; i < childElement.length; i++){
			that.element.removeChild(childElement[i]);
		}
	}
	
	
	this.removeChildElement = function(el){
		that.element.removeChild(el.element);
	}
	
	
	this.remove = function(){
		that.element.remove();
	}
	
	
	this.addClass = function(className) {
		that.element.classList.add(className);
	}
	
	
	this.removeClass = function(className) {
		that.element.classList.remove(className);
	}
	
	
	this.addId = function(className) {
		that.element.setAttribute('id', className);
	}

	
	this.setStyle = function(property, value, unit){
		that.element.style[property] = value;
	}
	
	
	this.setAttribute = function(property, value){
		that.element.setAttribute(property, value);
	}
	
	
	this.addText = function(someText){
		that.element.innerHTML = someText;
	}
	
	
	this.removeImages = function(){
		var child = that.element.childNodes;
		
		for(var i = 0; i < child.length; i++){
			if(child[i].className == 'img'){
				child[i].remove();
			}
		}
	}
}	