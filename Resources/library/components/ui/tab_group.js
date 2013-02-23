'use strict';

var Zen = require('/library/zen_ti');

var Context = Zen.import('ui.context');
var Tab = Zen.import('ui.tab');

function TabGroup(configuration) {
    this.setProperties(configuration);
}

Zen.extend(TabGroup, Context);

Object.defineProperties(TabGroup.prototype, {
	__TiConstructor: {
	    value: Ti.UI.createTabGroup,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__addTiElement: {
	    value: function(TiComponent) {
	        if (TiComponent instanceof Tab) {
	            var TiElement = TiComponent.__getTiElement();
	            var thisElement = this.__getTiElement();
	            thisElement.addTab(TiElement);
	            
	            //fix for tabgroup not firing "close" event
	            //TODO: remove?
	            TiElement.addEventListener('close', function() {
	                thisElement.fireEvent('close');
	            });
	        }
	        else {
	            throw this.toString() +  ' -> (__addTiElement) : Illegal argument' + TiElement;
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__canAdd: {
	    value: function(component) {
	        if (component instanceof Tab) {
	            return true;
	        }
	        return false;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	setActiveTab: {
	    value: function(index) {
	        this.__getTiElement().setActiveTab(index);
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	}
});

module.exports = TabGroup;