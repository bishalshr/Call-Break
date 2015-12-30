function Element() {
	this.element; 
	var that = this;
	
	this.create = function(el){
	that.element = document.createElement(el);	
	}
	
	this.appendTo = function(parentElement) {
		parentElement.appendChild(that.element);
	}
	
	this.appendElement = function(childElement){
		that.element.appendChild(childElement.element);
	}
	
	this.removeChildElement = function(){
		var childElement = this.element.childNodes;
		
		for(var i = 0; i < childElement.length; i++){
			this.element.removeChild(childElement[i]);
		}
		
	}
	
	this.removeElements = function(){
		var childElement = this.element.childNodes;
		
		for(var i = 0; i < childElement.length; i++){
			this.element.remove(childElement[i]);
		}
		
	}
	
	this.removeElement = function(el){
		this.element.removeChild(el.element);
	}
	
	this.removeFrom = function(parentElement){
		parentElement.removeChild(this.element);
	}
	
	this.addClass = function(className) {
		this.element.classList.add(className);
	}
	
	this.removeClass = function(className) {
		this.element.classList.remove(className);
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