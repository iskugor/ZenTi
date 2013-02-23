'use strict';

var Zen = require('/library/zen_ti');

var Map = Zen.import('containers.map');
var Collection = Zen.import('containers.collection');

function Element(configuration) {
    
}

Element.prototype = {};

Object.defineProperties(Element.prototype, {
	__createTiElement: {
	    value: function() {
	    	
	        if (!this.__TiElement) {
	            if (typeof this.__TiConstructor == 'function') {
	            	
	                this.__TiElement = this.__TiConstructor(this.getProperties());
	                
	                if (this.listeners) {
	                	
	                	var mappedListeners = new Map(this.listeners);
	                	
	                	mappedListeners.each(function(value, key) {
	                		if (typeof value == 'function') {
	                			this.addEventListener(key, value);
	                		}
	                		else if (value instanceof Collection) {
	                			value.each(function(val) {
	                				this.addEventListener(key, val);
	                			}, this);
	                		}
	                	}, this);
	                }
	                
	                if (this.init) {
	                    this.init();
	                }
	                
	            }
	            else {
	            	Ti.API.error(this.toString() + ': No container constructor!');
	                throw 'Illegal state exception';
	            }
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__TiConstructor: {
	    value: null,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__TiElement: {
	    value: null,
	    enumerable: false,
	    writable: true,
	    configurable: true
	},
	__getTiElement: {
    	value: function() {
	        if (!this.__TiElement) {
	            this.__createTiElement();
	        }
	        return this.__TiElement;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__removeTiElement: {
	    value: function() {
	        if (this.__TiElement) {
	            this.__TiElement = null;
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__parent: {
	    value: null,
	    enumerable: false,
	    writable: true,
	    configurable: true
	},
	setParent: {
	    value: function(parentComponent) {
	        this.__parent = parentComponent;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getParent: {
	    value: function() {
	        return this.__parent;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	removeParent: {
	    value: function() {
	        this.__parent = null;
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	hasParent: {
	    value: function() {
	        return !!this.__parent;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	//TODO: experimental
	getContext: {
	    value: function() {
	        if (!this.__Context) {
	            var Window = Zen.import('ui.window');
	            var parent = this.getParent();
	            this.__Context = (parent instanceof Window) ? parent : Element.prototype.getParent.call(parent);
	        }
	        return this.__Context;
	        
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	//TODO: experimental
	__Context: {
	    value: null,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	//TODO: experimental
	__removeContext: {
	    value: function() {
	        this.__Context = null;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getTiProperty: {
	    value: function(name) {
	        return this.__getTiElement()[name];
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getProperties: {
	    value: function() {
	        var props = {};
	        for (var p in this) {
	            props[p] = this[p];
	        }
	        
	        return props;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	setProperties: {
	    value: function(props) {
	        if (!props) {
	            return;
	        }
	        
	        if (this.__TiElement) {
	        	this.__TiElement.applyProperties(props);
	            for (var p in props) {
	                this[p] = props[p];
	            }
	        }
	        else {
	            for (var p in props) {
	                this[p] = props[p];
	            }
	        }
	        
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__createWrapperedListener: {
	    value: function(callback, thisValue) {
	    		var listener = (function(callback, thisValue, elementRef) {
	                return function(e) {
	                	if (callback._isExecuting) {
	                		Ti.API.warn('Listener is already executing ...' + this.toString());
	                		Ti.API.info('Preventing multiple executions ...');
	                		return;
	                	}
	                	callback._isExecuting = true;
	                    var retVal = callback.call(thisValue, elementRef.__createListenerArgumentObject(e));
	                    callback._isExecuting = false;
	                    return retVal;
	                };
	            })(callback, thisValue, this);
	            
	            return listener;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__createListenerArgumentObject: {
	    value: function(e) {
	    	
	    	var newE = {};
	    	
	    	newE.type = e.type;
	    	var nativeElement = this.__getTiElement();
	    	if (nativeElement === e.source) {
	    		newE.source = this;
	    	}
	    	else {
	    		Ti.API.warn('Source is not identical to "this" TiElement!');
	    		newE.source = e.source;
	    	}
	    	if (e.values) {
	    		newE.values = e.values;
	    	}
	    	return newE;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__listenerMapper: {
	    value: null,
	    enumerable: false,
	    writable: true,
	    configurable: true
	},
	__createListenerMapper: {
	    value: function() {
	    	if (!this.__listenerMapper) {
	    		this.__listenerMapper = new Map();
	    	}
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	addEventListener: {
	    value: function() {
	    	
	        var type = arguments[0];
	        var callback = arguments[1];
	        var thisValue = arguments[2] || this;
	        
	        var listener = this.__createWrapperedListener(callback, thisValue);
	        
	        listener.type = type;
	        
	        if (!this.__listenerMapper) {
	        	this.__createListenerMapper();
	        }
	        
	        if (this.__listenerMapper.get(callback)) {
	        	Ti.API.warn('Adding same listener! ' + this.toString());
	        }
	        else {
	        	this.__listenerMapper.add(listener, callback.toString());
	        }
	        
	        this.__getTiElement().addEventListener(type, listener);
	        
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	removeEventListener: {
	    value: function() {
	    	
	        var type = arguments[0];
	        var listener = arguments[1];
	        
	        var callback = this.__listenerMapper.get(listener);
	        
	        this.__getTiElement().removeEventListener(type, callback);
	        
	        this.__listenerMapper.remove(callback);
	        
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	removeAllEventListeners: {
	    value: function(type) {
	    	if (type) {
	    		this.__listenerMapper.each(function(value, key) {
		        	if (value.type == type) {
		        		this.off(value.type, key);
		        	}
		        }, this);
	    	}
	        else {
	        	this.__listenerMapper.each(function(value, key) {
		        	this.off(value.type, key);
		        }, this);
	        }
	        
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	fireEvent: {
	    value: function(type, args) {
	    	if (args) {
	    		var param = {};
	    		param.values = args;
	    		this.__getTiElement().fireEvent(type, param);
	    	}
	        else {
	        	this.__getTiElement().fireEvent(type);
	        }
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	//FIXME: doesn't work properly (or not :) ) 
	once: {
	    value: function() {
	    	
	        var type = arguments[0];
	        var callback = arguments[1];
	        var thisValue = arguments[2] || this;
	        
	
	        var listener = this.__createWrapperedListener(callback, thisValue);         
	        
	        var off = (function(listener, type) {
	            return function(e) {
	            	if (listener) {
	            		listener(e);
	            	}
	                else {
	                	Ti.API.warn('Listener is "undefined" in "once" method! ' + this.toString());
	                }
	                if (this && this.off && off) {
	                    this.off(type, off);
	                }
	            }
	        })(listener, type);
	        
	        this.addEventListener(type, off);
	        
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	toString: {
	    value: function() {
	        return "[object Zen" + (this.constructor.name || 'Object') + "]";
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	valueOf: {
	    value: function() {
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	//CONSTANTS
	DIMENSION_FILL: {
	    value: Ti.UI.FILL,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	DIMENSION_SIZE: {
	    value: Ti.UI.SIZE,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getRect: {
	    value: function() {
	        return this.__getTiElement().getRect();
	    },
	    enumerable: false,
	    writable: false,
	    configurable: false
	},
	getSize: {
	    value: function() {
	        return this.__getTiElement().getSize();
	    },
	    enumerable: false,
	    writable: false,
	    configurable: false
	},
	//TODO: test "show" and "hide"
	show: {
	    value: function() {
	        var TiElement = this.__getTiElement();
	        TiElement.show();
	        TiElement.height = this.constructor.prototype.height;
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: false
	},
	hide: {
	    value: function() {
	        var TiElement = this.__getTiElement();
	        TiElement.hide();
	        TiElement.height = 0;
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: false
	},
	//TODO: implement animate callback properties
	animate: {
	    value: function(props, callback) {
	    	if (typeof callback == 'function') {
	    		var _this;
	        	this.__getTiElement().animate(props, function() {
	        		callback.call(_this);
	        	});
	    	}
	    	else {
	    		this.__getTiElement().animate(props);
	    	}
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: false
	},
	serialize: {
	    value: function() {
	        return JSON.stringify(this.getProperties());
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	}
});
//aliases
Object.defineProperty(Element.prototype, 'on', Object.getOwnPropertyDescriptor(Element.prototype, 'addEventListener'));

Object.defineProperty(Element.prototype, 'offAll', Object.getOwnPropertyDescriptor(Element.prototype, 'removeAllEventListeners'));

Object.defineProperty(Element.prototype, 'off', Object.getOwnPropertyDescriptor(Element.prototype, 'removeEventListener'));

Object.defineProperty(Element.prototype, 'trigger', Object.getOwnPropertyDescriptor(Element.prototype, 'fireEvent'));

module.exports = Element;