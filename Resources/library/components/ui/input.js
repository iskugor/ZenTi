'use strict';

var Zen = require('/library/zen_ti');

var Control = Zen.import('ui.control');

function Input() {
    
}

Zen.extend(Input, Control);

Object.defineProperties(Input.prototype, {
	getValueProperty: {
	    value: function() {
	        return this.__getTiElement().value;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	setValueProperty: {
	    value: function(value) {
	        this.__getTiElement().value = value;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	}
});

module.exports = Input;