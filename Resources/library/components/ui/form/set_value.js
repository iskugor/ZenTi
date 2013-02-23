'use strict';

var Zen = require('/library/zen_ti');

var Container = Zen.import('ui.container');
var TableViewRow = Zen.import('ui.table_view_row');
var SimpleTableViewRow = Zen.import('ui.simple_table_view_row');
var Input = Zen.import('ui.input');

function setValue(component) {
	
	if (!component) {
		return;
	}
	
    if (component instanceof TableViewRow || component instanceof SimpleTableViewRow) {
        Object.defineProperty(component, '__value', {
            value: null,
            enumerable: false,
            writable: true,
            configurable: true
        });
        
        Object.defineProperty(component, 'setValue', {
            value: function(value) {
                this.__value = value;
            },
            enumerable: false,
            writable: true,
            configurable: true
        });
    }
    else if (component instanceof Container) {
    	//Ti.API.info('Component ' + component + ' is instance of Container');
        Object.defineProperty(component, 'setValue', {
            value: function(values) {
                var children = this.getChildren();
                if (children) {
                	/*Ti.API.info('Setting value');
                	Ti.API.debug(this.toString());
                	Ti.API.debug(children);
                	Ti.API.debug(children.length);*/
                    children.each(function(child, key) {
                    	
                    	//Ti.API.info(child.toString());
                    	//Ti.API.debug(key);
                        if (child && typeof child.setValue == 'function' && this[key] !== undefined) {
                            child.setValue(this[key]);
                        }
                    }, values);
                }
                //this.__value = values;
            },
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    else {
       if (component instanceof Input) {
            Object.defineProperty(component, 'setValue', {
                value: function(values) {
                    this.setValueProperty(values);
                },
                enumerable: false,
                writable: false,
                configurable: true
            });
        }
    }
}

module.exports = setValue;