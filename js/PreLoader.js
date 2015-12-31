var preLoader = new PreLoader();
preLoader.init();

function PreLoader() {
	var that = this;
	
	this.init = function(){
  window.onload = function() {
    var sources = {
      resource1: 'images/0.gif',
      resource2: 'images/1.gif',
      resource3: 'images/2.gif',
      resource4: 'images/3.gif',
      resource5: 'images/4.gif',
      resource6: 'images/5.gif',
      resource7: 'images/6.gif',
      resource8: 'images/7.gif',
      resource9: 'images/8.gif',
      resource10: 'images/9.gif',
      resource11: 'images/10.gif',
      resource12: 'images/11.gif',
      resource13: 'images/12.gif',
      resource14: 'images/13.gif',
      resource15: 'images/14.gif',
      resource16: 'images/15.gif',
      resource17: 'images/16.gif',
      resource18: 'images/17.gif',
      resource19: 'images/18.gif',
      resource20: 'images/19.gif',
      resource21: 'images/20.gif',
      resource22: 'images/21.gif',
      resource23: 'images/22.gif',
      resource24: 'images/23.gif',
      resource25: 'images/24.gif',
      resource26: 'images/25.gif',
      resource27: 'images/26.gif',
      resource28: 'images/27.gif',
      resource29: 'images/28.gif',
      resource30: 'images/29.gif',
      resource31: 'images/30.gif',
      resource32: 'images/31.gif',
      resource33: 'images/32.gif',
      resource34: 'images/33.gif',
      resource35: 'images/34.gif',
      resource36: 'images/35.gif',
      resource37: 'images/36.gif',
      resource38: 'images/37.gif',
      resource39: 'images/38.gif',
      resource40: 'images/39.gif',
      resource41: 'images/40.gif',
      resource42: 'images/41.gif',
      resource43: 'images/42.gif',
      resource44: 'images/43.gif',
      resource45: 'images/44.gif',
      resource46: 'images/45.gif',
      resource47: 'images/46.gif',
      resource48: 'images/47.gif',
      resource49: 'images/48.gif',
      resource50: 'images/49.gif',
      resource51: 'images/50.gif',
      resource52: 'images/51.gif',
      resource53: 'images/52.gif',
      resource54: 'images/button.png',
      resource55: 'images/close-button.png',
      resource56: 'images/cover.jpg',
      resource57: 'images/hover-button.png',
      resource58: 'images/menu.png',
      resource59: 'images/menu-button.png',
      resource60: 'images/score.png',
      resource61: 'images/spade.png',
      resource62: 'images/spade2.png',
      resource63: 'images/submenu.png'
    };
    that.loadImages(sources); // calls initGame after *all* images have finished loading
  };
	
	}

  this.loadImages = function(sources) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    for (var src in sources) {
      numImages++;
    }
    for (var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if (++loadedImages >= numImages) {
					console.log(loadedImages);
          that.initGame(images);
        }
      };
      images[src].src = sources[src];
    }
  }

  this.initGame = function(images) {
    var startingAnimation = new StartingAnimation();
    startingAnimation.init();
  }
}