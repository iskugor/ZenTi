'use strict';

var Zen = require('/library/zen_ti');

var Control = Zen.import('ui.control');

var Theme = Zen.import('ui.theme').Label;

function Label(configuration) {
    this.setProperties(configuration);
};

Zen.extend(Label, Control);

Object.defineProperties(Label.prototype, {
	__TiConstructor: {
	    value: Ti.UI.createLabel,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	ALIGNMENT_LEFT: {
	    value: Ti.UI.TEXT_ALIGNMENT_LEFT,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	ALIGNMENT_RIGHT: {
	    value: Ti.UI.TEXT_ALIGNMENT_RIGHT,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	ALIGNMENT_CENTER: {
	    value: Ti.UI.TEXT_ALIGNMENT_CENTER,
	    enumerable: false,
	    writable: false,
	    configurable: true
	}
});

Label.prototype.setProperties(Theme);

module.exports = Label;