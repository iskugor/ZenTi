'use strict';

var Zen = require('/library/zen_ti');

var Container = Zen.import('ui.container');
var Theme = Zen.import('ui.theme').TableViewRow;

function TableViewRow(configuration) {
    this.setProperties(configuration);
}

Zen.extend(TableViewRow, Container);

TableViewRow.prototype.setProperties(Theme);

Object.defineProperties(TableViewRow.prototype, {
	__TiConstructor: {
	    value: Ti.UI.createTableViewRow,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	//not good idea to use default class name
	/*className: {
	    value: 'RowClass',
	    enumerable: true,
	    writable: true,
	    configurable: true
	},*/
	//TODO: get this functionlity from simple table view row!
	select: {
	    value: function(backgroundColor) {
	    	//TODO: use "theme" module
	        this.setProperties({ backgroundColor: (backgroundColor || '#666'), isSelected: true });
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	deselect: {
	    value: function(backgroundColor) {
	        this.setProperties({ backgroundColor: (backgroundColor || '#000'), isSelected: false });
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	toogle: {
	    value: function(backgroundColor) {
	        this.isSelected ? this.deselect(backgroundColor) : this.select(backgroundColor);
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	isSelected: {
		value: false,
	    enumerable: false,
	    writable: true,
	    configurable: true
	}
});

module.exports = TableViewRow;