'use strict';

var Zen = require('/library/zen_ti');

var Container = Zen.import('ui.container');
var Map = Zen.import('containers.map');
var Input = Zen.import('ui.input');
var TableViewRow = Zen.import('ui.table_view_row');
var SimpleTableViewRow = Zen.import('ui.simple_table_view_row');

function getValue(component) {
	
	if (!component) {
		return;
	}
    
    //TODO: write for table view section
    //TODO: complex rows are covered with Container type
    if (component instanceof TableViewRow || component instanceof SimpleTableViewRow) {
        
        Object.defineProperty(component, 'getValue', {
            value: function() {
                return this.__value;
            },
            enumerable: false,
            writable: true,
            configurable: true
        });
    }
    else if (component instanceof Container) {
        
        Object.defineProperty(component, 'getValue', {
            value: function() {
                if (this.__values) {
                    return this.__values;
                }
                
                var values = {};
        
                var children = this.getChildren();
                
                if (children) {
                    children.each(function(value, key) {
                    		//Ti.API.info('CHILD: ' + key);
                        if (value && value.getValue) {
                            values[key] = value.getValue();
                        }
                        else if (value instanceof Container) {
                            //var val = new Map(getValue.call(value));
                            //if (true || this.getValue) {
                            	//Ti.API.info('this');
                            	//Ti.API.debug(this);
                            	var val = new Map(component.getValue.call(value));
	                            val.each(function(v, k) {
	                                values[k] = v;
	                            });
                            //}
                        }
                    }, this);
                }
                return values;
            },
            enumerable: false,
            writable: false,
            configurable: true
        });
        
    }
    else {
        if (component instanceof Input) {
            Object.defineProperty(component, 'getValue', {
                value: function() {
                    return this.getValueProperty();
                },
                enumerable: false,
                writable: false,
                configurable: true
            });
        }
        else {
        	Ti.API.warn("Form-getValue :: Could not detect component's instance type " + component)
        }
    }
}

module.exports = getValue;