'use strict';

var Zen = require('/library/zen_ti');

var Input = Zen.import('ui.input');

var Theme = Zen.import('ui.theme').Switch;

function Switch(configuration) {
    this.setProperties(configuration);
};

Zen.extend(Switch, Input);

Object.defineProperties(Switch.prototype, {
	__TiConstructor: {
	    value: Ti.UI.createSwitch,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getValueProperty: {
	    value: function() {
	        return !!this.__getTiElement().value;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	setValueProperty: {
	    value: function(value) {
	        this.__getTiElement().value = !!value;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
   }
});

Switch.prototype.setProperties(Theme);

module.exports = Switch;