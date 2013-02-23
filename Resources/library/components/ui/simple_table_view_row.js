'use strict';

var Zen = require('/library/zen_ti');

var List = Zen.import('containers.list');
var Control = Zen.import('ui.control');
var SimpleTableView = Zen.import('ui.simple_table_view');
var TableViewSection = Zen.import('ui.table_view_section');
var Theme = Zen.import('ui.theme').TableViewRow;

function SimpleTableViewRow(configuration) {
    this.setProperties(configuration);
}

Zen.extend(SimpleTableViewRow, Control);

SimpleTableViewRow.prototype.setProperties(Theme);

Object.defineProperties(SimpleTableViewRow.prototype, {
	__TiConstructor: {
	    value: Ti.UI.createTableViewRow,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	//TODO see TableViewRow component
	/*className: {
	    value: 'RowClass',
	    enumerable: true,
	    writable: true,
	    configurable: true
	},*/
	__canBeAddedTo: {
		value: new List([ SimpleTableView, TableViewSection ]),
		enumerable: false,
	    writable: false,
	    configurable: true
	},
	//TODO: define property "selectedBackgroundColor"
	select: {
	    value: function(backgroundColor) {
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
	    enumerable: true,
	    writable: true,
	    configurable: true
	}
});

module.exports = SimpleTableViewRow;