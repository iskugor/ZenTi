'use strict';

var Zen = require('/library/zen_ti');

var Container = Zen.import('ui.container');

function Context(configuration) {
    
}

Zen.extend(Context, Container);

Object.defineProperties(Context.prototype, {
	open: {
	    value: function(options) {
	        this.__getTiElement().open(options);
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	close: {
	    value: function() {
	        this.__getTiElement().close();
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	}
});

module.exports = Context;