'use strict';

var Zen = require('/library/zen_ti');

var Container = Zen.import('ui.container');
var Collection = Zen.import('containers.collection');
var List = Zen.import('containers.list');

var Theme = Zen.import('ui.theme').TableView;

//TODO: rename to ListView
function SimpleTableView(configuration) {
    this.setProperties(configuration);
}

Zen.extend(SimpleTableView, Container);

//TODO: define property "selectedBackgroundColor"
SimpleTableView.prototype.setProperties(Theme);

Object.defineProperties(SimpleTableView.prototype, {
	__ContainerConstructor: {
	    value: List,
	    enumerable: false,
	    writable: true,
	    configurable: true
	},
	__TiConstructor: {
	    value: Ti.UI.createTableView,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__isTableViewRow: {
	    value: function(component) {
	    	var SimpleTableViewRow = Zen.import('ui.simple_table_view_row');
	    	var TableViewRow = Zen.import('ui.table_view_row');
	    	return component instanceof TableViewRow || component instanceof SimpleTableViewRow;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__addSingle: {
	    value: function(component, index) {
	        //TODO: refactor
	        if (this.__isTableViewRow(component) && index !== undefined) {
	            var exists = this.get(index);
	            if (exists) {
	                //this.updateRow(component, index);
	                Ti.API.error('Component already exists: ' + index + ' in ' + this.toString() + ' Use "replace" instead!');
	                throw 'Illegal action exception';
	            }
	            
	            if (this.getChildren().length < index) {
	            	//TODO: raise exception!
	            }
	            
	            //this.__addTiElement(component, index);
	            this.__getTiElement().appendRow(component.__getTiElement());
	            
	            this.getChildren().add(component, index);
	            component.setParent(this);
	        }
	        else {
	            Ti.API.error('Illegal arguments: ' + component + ' ' + index);
	            throw 'Illegal argument exception';
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__addCollection: {
	    value: function(component) {
	        //var children = this.getChildren();
	        //var childrenLength = children.length;
	        
	        //TODO: implement this lazy loading algorithm
	        var clen = component.length;
	        
	        if (clen > 100) {
	        	var currentIndex = 0;
	        	var timeout = 50;
	        	var _this = this;
	        	
	    		if (clen > currentIndex) {
	    			var nrows = [], nextCurrentIndex = currentIndex + 30;
	    			//Ti.API.info('nextCurrentIndex: ' + nextCurrentIndex);
	    			if (nextCurrentIndex < clen) {
	    				for (var i = currentIndex; i < nextCurrentIndex; ++i) {
	        				nrows[nrows.length] = component.get(i).__getTiElement();
	        			}
	        			_this.__getTiElement().appendRow(nrows);
	        			currentIndex = nextCurrentIndex;
	    			}
	    			else {
	    				for (var i = currentIndex; i < clen; ++i) {
	        				nrows[nrows.length] = component.get(i).__getTiElement();
	        			}
	        			_this.__getTiElement().appendRow(nrows);
	        			currentIndex = clen;
	    			}
	    		}
	    		
	    		var isScrolling = false, semaphone = false;
	    		
	    		this.on('scrolling', function() {
	    			isScrolling = true;
	    		});
	    		
	    		this.on('scrollEnd', function() {
	    			isScrolling = false;
	    		});
	    		
	    		var appendRows = function() {
	    			if (isScrolling || semaphone) {
	    				return;
	    			}
	    			semaphone = true;
	    			//Ti.API.error('currentIndex: ' + currentIndex);
	        		if (clen > currentIndex) {
	        			var nrows = [], nextCurrentIndex = currentIndex + 100;
	        			//Ti.API.info('nextCurrentIndex: ' + nextCurrentIndex);
	        			if (nextCurrentIndex < clen) {
	        				for (var i = currentIndex; i < nextCurrentIndex; ++i) {
		        				nrows[nrows.length] = component.get(i).__getTiElement();
		        				if (isScrolling) {
	        						break;
	        					}
		        			}
		        			_this.__getTiElement().appendRow(nrows);
		        			currentIndex = i;
	        			}
	        			else {
	        				for (var i = currentIndex; i < clen; ++i) {
		        				nrows[nrows.length] = component.get(i).__getTiElement();
		        				if (isScrolling) {
	        						break;
	        					}
		        			}
		        			_this.__getTiElement().appendRow(nrows);
		        			currentIndex = i;
	        			}
	        		}
	        		else {
	        			clearInterval(interval);
	        			_this.off('postlayout', appendRows);
	        		}
	        		semaphone = false;
	    		};
	    		
	    		var interval = setInterval(appendRows, timeout);
	    		
	        	this.once('postlayout', appendRows);
	        	
	        }
	        else {
	        	var nativeRows = [], i = 0, nextTableViewIndex = this.__getTiElement().data.length;
		        component.each(function(value, key) {
		            //this.append(value);
		            if (this.__isTableViewRow(value)) {
		            	nativeRows[i++] = value.__getTiElement();
		            }
		            else {
		            	Ti.API.error('Value in collection is not instance of table view row: ' + value.toString());
		                throw 'Illegal value exception';
		            }
		            this.getChildren().add(value, nextTableViewIndex++);
		            value.setParent(this);
		        }, this);
		        
		        this.__getTiElement().appendRow(nativeRows);
	        }
	        
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__removeChildTiElement: {
	    value: function(index) {
	        this.__getTiElement().deleteRow(index);
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	append: {
	    value: function(rows) {
	        
	        if (rows instanceof Collection) {
	        	//TODO: 
	        	this.add(rows);
	        }
	        else {
	        	this.add(rows, this.getChildren().length);
	        }
	        
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	replace: {
	    value: function(row, index) {
	    	
	        if (this.__isTableViewRow(row) && index >= 0 && !isNaN(+index)) {
	        	
	            var children = this.getChildren(), thisTiElement = this.__getTiElement();
	            
	            var old = children.get(index);
	            
	            old.removeParent();
	            old.__removeTiElement();
	            
	            thisTiElement.updateRow(+index, row.__getTiElement());
	            
	            children.add(row, index);
	            row.setParent(this);
	            
	        }
	        else {
	            Ti.API.warn('Illegal parameter! Row: ' + row + ' index: ' + index + ' this: ' + this);
	            throw 'Illegal parameter exception';
	        }
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__createWrapperedListener: {
	    value: function(callback, thisValue) {
	    	
			var listener = (function(thisVal, thisTableView) {
				return function(e) {
					
		            var newE = {};
		            
		            for (var i in e) {
		            	newE[i] = e[i];
		            }
		            
		            var row = thisTableView.get(e.index);
		            
		            if (!row) {
		            	Ti.API.warn(this.toString() + ' Row not found! Index: ' + e.index);
		            	//throw 'Illegal state exception!';
		            }
		            else {
		            	newE.row = row;
		            
			            if (row instanceof SimpleTableViewRow) {
			            	newE.source = row;
			            }
			            else {
			            	newE.source = row.__findSource(e.source);
			            }
		            }
		            
		            delete newE.section;
		            delete newE.rowData;
		            
		            callback.call(thisVal, newE);
		            //callback.call(thisVal, e);
		        };
			})(thisValue || this, this);
	        
	        return listener;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	remove: {
	    value: function(index) {
	        var component = this.get(index);
	        if (component) {
	            this.getChildren().remove(index);
	            component.removeParent();
	            this.__removeChildTiElement(index);
	        }
	        else {
	            Ti.API.warn('You tried to remove non-existing component: ' + index + ' from ' + this.toString());
	        }
	        
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	removeAll: {
	    value: function() {
	        var thisElement = this.__getTiElement();
	        thisElement.setData([]);
	        this.getChildren().each(function(value) {
	        	value.removeParent();
	        });
	        this.__removeChildrenContainer();
	        
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	select: {
	    value: function(index, backgroundColor) {
	        this.get(index).setProperties({ backgroundColor: (backgroundColor || '#666'), isSelected: true });
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	deselect: {
	    value: function(index, backgroundColor) {
	        this.get(index).setProperties({ backgroundColor: (backgroundColor || '#000'), isSelected: false });
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	selectAll: {
	    value: function(backgroundColor) {
	        this.getChildren().each(function(value, key) {
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

module.exports = SimpleTableView;