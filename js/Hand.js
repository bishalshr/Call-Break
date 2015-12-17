function Hand(i) {
	
  var hand = [], newHand = [], playerNum = i, id;
	var playerBox = document.getElementsByClassName('small-box')[i];
  var x = 0;
	var y = 0;
	var that=this;
	
	this.clear = function() {
      hand = [];
   }
   
  this.addCard = function(card) {
    hand.push(card);
  }
   
  this.removeCard = function(card) {
    var index = hand.indexOf(card);
		hand.splice(index,1);
  }
   
  this.removeCard = function(position) {
    if (position < 0 || position >= hand.length)
			alert('wrong card thrown see code');
		
		hand.splice(position,1);
  }

  this.getCardCount = function() {
      return hand.length;
  }
   
   
  this.getCard = function(position) {
    if (position < 0 || position >= hand.length)
			alert('wrong card see code');
  
		return hand[position];
  }
	
	this.removePlayerCard = function(card){
		 var index = hand.indexOf(card);
		 //console.log(index);
		 hand[index] = null;
	}
	
	this.setImage = function(position, showCard){
		/* id = position;
		var showCard = that.getCard(position);
		var imageNum = showCard.getImgValue();
		
		var imgDiv = document.createElement('div');
		var img = document.createElement('img');
		
		img.setAttribute('src','images/'+0+'.gif');
		img.setAttribute('id', 'img' + (id + (playerNum * 13)));
		imgDiv.style.position = 'absolute';
		
		if(playerNum % 2 != 0){
			imgDiv.style.left = x + 'px';
			x = x + 25;
		}
		else {
			imgDiv.style.top = y + 'px';
			y = y + 20;
		}
		
		imgDiv.appendChild(img);
		playerBox.appendChild(imgDiv); */
		var imgDiv = document.getElementById((position+(i*13)));
		
		var img = document.createElement('img');
		if(showCard == false)
			img.setAttribute('src','images/'+0+'.gif');
		else{
			var showCard = that.getCard(position);
			var imageNum = showCard.getImgValue();
			img.setAttribute('src','images/'+imageNum+'.gif');
		}
		imgDiv.appendChild(img);
		
	}
	
	
   this.sortByValue = function() {
    while (hand.length > 0) {
         //debugger;
				 var pos = 0;  // Position of minimal card.
         var c = hand[0];  // Minimal card.
         for (var i = 1; i < hand.length; i++) {
            var c1 = hand[i];
            if ( c1.getSuit() < c.getSuit() ||
                    (c1.getSuit() == c.getSuit() && c1.getValue() < c.getValue()) ) {
                pos = i;
                c = c1;
            
            if ( c1.getValue() < c.getValue() ||
                    (c1.getValue() == c.getValue() && c1.getSuit() < c.getSuit()) ) {
                pos = i;
                c = c1;
            }
         }
         }
         hand.splice(pos, 1);
         newHand.push(c);
      } 
			hand = newHand;
   }
	 
	
}