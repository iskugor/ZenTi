'use strict';

var Zen = require('/library/zen_ti');

var Context = Zen.import('ui.context');

function Tab(configuration) {
    this.setProperties(configuration);
}

Zen.extend(Tab, Context);

Object.defineProperties(Tab.prototype, {
	__TiConstructor: {
	    value: Ti.UI.createTab,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__addTiElement: {
	    value: function(WinComponent) {
	    	
	    	var Window = Zen.import('ui.window');
	    	
	        if (WinComponent instanceof Window) {
	           
	           var thisElement = this.__getTiElement();
	           var win = WinComponent.__getTiElement();
	           thisElement.window = win;
	           
	           //fix for tabgroup not firing "close" event
	           win.addEventListener('close', function() {
	               thisElement.fireEvent('close');
	           });
	           
	           //fix for tabgroup not firing "focus" event
	           /*win.addEventListener('focus', function() {
	               thisElement.fireEvent('focus');
	           });*/
	        }
	        else {
	            throw this.toString() +  ' -> (__addTiElement) : Illegal argument ' + WinComponent;
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	open: {
	    value: function(win, options) {
	    	var Window = Zen.import('ui.window');
	    	if (win instanceof Window) {
	    		var thisTiElement = this.__getTiElement();
	    		var winTiElement = win.__getTiElement();
	    		thisTiElement.open(winTiElement, options);
	    	}
	    	else {
	    		Ti.API.warn(this.toSting() + ' illegal parameter to "open" method: ' + win);
	    		throw 'Illegal argument exception!';
	    	}
	    	
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	close: {
	    value: function(win) {
	    	var Window = Zen.import('ui.window');
	    	if (win instanceof Window) {
	    		var thisTiElement = this.__getTiElement();
	    		var winTiElement = win.__getTiElement();
	    		thisTiElement.close(winTiElement);
	    	}
	    	else {
	    		Ti.API.warn(this.toSting() + ' illegal parameter to "close" method: ' + win);
	    		throw 'Illegal argument exception!';
	    	}
	    	
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
   }
});

module.exports = Tab;