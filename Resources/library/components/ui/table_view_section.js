var Zen = require('/library/zen_ti');

var Container = Zen.import('ui.container');

var List = Zen.import('containers.list');

function TableViewSection(configuration) {
    this.setProperties(configuration);
}

Zen.extend(TableViewSection, Container);

Object.defineProperties(TableViewSection.prototype,  {
	__TiConstructor: {
	    value: Ti.UI.createTableViewSection,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__ContainerConstructor: {
	    value: List,
	    enumerable: false,
	    writable: true,
	    configurable: true
	},
	__isDefaultSection: {
	    value: false,
	    enumerable: false,
	    writable: true,
	    configurable: true
	},
	__isTableViewRow: {
	    value: function(component) {
	    	//FIXME: make sure this works with simple table view rows also
			var TableViewRow = Zen.import('ui.table_view_row');
			var SimpleTableViewRow = Zen.import('ui.simple_table_view_row');
	    	return component instanceof TableViewRow || component instanceof SimpleTableViewRow;
	    },
	    enumerable: false,
	    writable: true,
	    configurable: true
	},
	__addSingle: {
	    value: function(component, name) {
	        if (name !== undefined) {
	            var exists = this.get(name);
	            if (exists) {
	                Ti.API.error('Component already exists: ' + name + ' in ' + this.toString() + ' Use "replace" instead!');
	                throw 'Illegal action exception';
	            }
	        }
	        else {
	            throw 'Illegal argument exception';
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__addCollection: {
	    value: function(component) {
        	component.each(function(value, key) {
	    		if (this.__isTableViewRow(value)) {
	    			
	    			this.__addTiElement(value);
	    			
	    			this.getChildren().add(value, key);
	    			value.setParent(this);
	    			
	    		}
	    		else {
	    			Ti.API.error('Illegal value in "__addCollection" method! Value: ' + value + ', key: ' + key);
	    			throw 'Illegal value exception!';
	    		}
	        }, this);
	        
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__triggerRelayout: {
	    value: function() {
	        var table = this.getParent();
	        if (table) {
	        	var tableTiElement = table.__getTiElement();
	        	
	        	tableTiElement.setData(tableTiElement.data);
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	replace: {
		value: function(component, index) {
			if (component instanceof TableViewRow) {
				
				var tableView = this.getParent();
				var children = this.getChildren();
				
				//section is not yet added to the table view
				if (!tableView) {
					children.add(component, index);
					component.setParent(this);
					return;
				}
				
				var tableViewTiElement = tableView.__getTiElement();
				
				var tiElement = this.__getTiElement();
				
				if (tableViewTiElement.data && tableViewTiElement.data.length > 1) {
					var currentIndex = 0, numberOfSections = tableViewTiElement.data.length;
					if (numberOfSections > 1) {
						Ti.API.error('Titanium error, see: https://jira.appcelerator.org/browse/TIMOB-9702');
						Ti.API.warn('Failing silently ... :( ');
					}
					else {
						for (var i = 0; i < numberOfSections; ++i) {
							if (tableViewTiElement.data[i] === tiElement) {
								currentIndex += index;
								break;
							}
							else {
								currentIndex += tableViewTiElement.data[i].rows.length;
							}
						}
						
						tableViewTiElement.updateRow(currentIndex, component.__getTiElement());
					}
					
					
				}
				else {
					tableViewTiElement.updateRow(index, component.__getTiElement());
				}
				children.add(component, index);
				
				component.setParent(this);
			}
			else {
				Ti.API.error(this.toString()  + ': Component "' + component.toString()) + '" is not instance of TableViewRow! ';
	            throw 'Illegal argument exception';
	        }
		},
		enumerable: false,
	    writable: false,
	    configurable: true
	},
	append: {
		value: function(component) {
			this.add(component, this.getChildren().length);
		},
		enumerable: false,
	    writable: false,
	    configurable: true
	},
	select: {
	    value: function(index, backgroundColor) {
	    	if (isNaN(+index)) {
	    		this.selectAll(backgroundColor);
	    	}
	    	else {
	    		this.get(index).select(backgroundColor);
	    	}
	        
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	deselect: {
	    value: function(index, backgroundColor) {
	    	if (isNaN(+index)) {
	    		this.deselectAll(backgroundColor);
	    	}
	    	else {
	    		this.get(index).deselect(backgroundColor);
	    	}
	        
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	selectAll: {
	    value: function(backgroundColor) {
	        this.getChildren().each(function(value) {
	        	value.select(backgroundColor);
	        });
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	deselectAll: {
	    value: function( backgroundColor) {
	        this.getChildren().each(function(value) {
	        	value.deselect(backgroundColor);
	        });
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	}
});

module.exports = TableViewSection;