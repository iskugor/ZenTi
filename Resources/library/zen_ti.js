'use strict';

var extend = (function() {
    var Fn = function() {};
    return function(fnSub, fnSuper) {
        Fn.prototype = fnSuper.prototype;
        fnSub.prototype = new Fn();
        fnSub.__parentConstructor = fnSuper;
        Object.defineProperty(fnSub.prototype, 'constructor', {
        	value: fnSub,
        	writable: false,
        	enumerable: false,
        	configurable: true
        });
    };
})();

var Zen = {
    //TODO: move to "utils" or "platform"
	isAndroid: !!Ti.UI.Android,
	isPhone: !!Ti.UI.iPhone,
	screen: {
		width: Ti.Platform.displayCaps.platformWidth,
		height: Ti.Platform.displayCaps.platformHeight
	},
	getPaths: function() {
		var libPaths = require('/library/paths');
		return libPaths;
	},
	//TODO: verify
	setDependency: function() {
		
		var Dependencies = require('/library/dependencies');
		
		var path = arguments[0];
       
        var len = arguments.length, currentContext = Dependencies[arguments[1]];
        
        if (len === 2) {
        	Dependencies[arguments[1]] = path;
        }
        
        for (var i = 2; i < len; ++i) {
        	if (!currentContext) {
        		currentContext = {};
        	}
        }
        currentContext[arguments[len - 1]] = path;
	},
    define: function(object, property, descriptor) {
        if (!object || !property) {
            Ti.API.warn('ZenTi define method illegal arguments!');
            return;
        }
        if (!descriptor) {
            descriptor = {
                enumerable: false,
                writable: true,
                configurable: true
            }
            Object.defineProperty(object, property, descriptor);
            return;
        }
        if (descriptor.enumerable === undefined) {
            descriptor.enumerable = false;
        }
        if (descriptor.writable === undefined) {
            descriptor.writable = true;
        }
        if (descriptor.configurable === undefined) {
            descriptor.configurable = true;
        }
        
        Object.defineProperty(object, property, descriptor);
    },
    defineConstant: function(object, property, value) {
        this.define(object, property, {
            value: value,
            enumerable: false,
            writable: false,
            configurable: false
        });
    },
    defineConstants: function(object, constants) {
    	
    	var Map = this.import('containers.map');
    	
    	var mappedConstants = new Map(constants);
    	var props = {};
    	
        mappedConstants.each(function(value, key) {
    		// this.defineConstant(object, key, value);
            this[key] = {
                value: value,
                enumerable: false,
                writable: false,
                configurable: false
            };

    	}, props);

        Object.defineProperties(object, props);
    },
    defineMethod: function(object, property, value) {
        this.define(object, property, {
            value: value,
            enumerable: false,
            writable: false,
            configurable: true
        });
    },
    defineMethods: function(object, methods) {
    	
    	var Map = this.import('containers.map');
    	
    	var mappedMethods = new Map(methods);
    	var props = {};
    	mappedMethods.each(function(value, key) {
    		this[key] = {
                value: value,
                enumerable: false,
                writable: false,
                configurable: true
            };
    	}, props);

        Object.defineProperties(object, props);
    },
    defineProperty: function(object, property, value) {
        this.define(object, property, {
            value: value,
            enumerable: true,
            writable: true,
            configurable: true
        });
    },
    defineProperties: function(object, props) {
    	
    	var Map = this.import('containers.map');
    	
    	var mappedProps = new Map(props);
    	var props = {};
    	mappedProps.each(function(value, key) {
    		this[key] = {
                value: value,
                enumerable: true,
                writable: true,
                configurable: true
            };
    	}, props);
        Object.defineProperties(object, props);
    },
    defineListener: function(object, eventName, eventHandler) {
    	if (!object.listeners) {
    		Zen.define(object, 'listeners', {
	            value: {},
	            enumerable: false,
	            writable: true,
	            configurable: true
	        });
    	}
    	if (object.listeners[eventName]) {
    		var List = this.import('containers.list');
    		if (!(object.listeners[eventName] instanceof List)) {
    			
    			var objListeners = new List();
    			
    			objListeners.append(object.listeners[eventName]);
    			
    			this.define(object.listeners, eventName, {
		            value: objListeners,
		            enumerable: true,
		            writable: true,
		            configurable: true
		        });
    		}
    		
    		object.listeners[eventName].append(eventHandler);
    		
    	}
    	else {
    		this.define(object.listeners, eventName, {
	            value: eventHandler,
	            enumerable: true,
	            writable: true,
	            configurable: true
	        });
    	}
    },
    defineListeners: function(object, listeners) {
    	
    	var Collection = this.import('containers.collection');
    	var Map = this.import('containers.map');
    	
    	var mappedListeners = new Map(listeners);
    	
    	if (object.listeners) {
    		//Ti.API.info('defineListeners, listners exists');
    		var oldListeners = this.create(object.listeners);
    		var mappedOldListeners = new Map(oldListeners);
    		mappedOldListeners.each(function(value, key, obj) {
    			if (value instanceof Collection) {
    				//Ti.API.warn('Resetting listner ' + key);
    				obj[key] = value.clone();
    			}
    		});
    		Zen.define(object, 'listeners', {
	            value: oldListeners,
	            enumerable: false,
	            writable: true,
	            configurable: true
	        });
    	}
    	
    	mappedListeners.each(function(value, key) {
    		//Ti.API.error(key);
    		//Ti.API.error(typeof value);
    		if (typeof value == 'function') {
    			this.defineListener(object, key, value);
    		}
    		else if (value instanceof Collection) {
    			value.each(function(val) {
    				this.defineListener(object, key, val);
    			}, this);
    		}
    	}, this);
    },
    reDefineListener: function(object, eventName, eventHandler) {
    	if (object.listeners) {
    		
    		Zen.define(object, 'listeners', {
	            value: this.create(object.listeners),
	            enumerable: false,
	            writable: true,
	            configurable: true
	        });
    	}

		this.define(object.listeners, eventName, {
            value: eventHandler,
            enumerable: true,
            writable: true,
            configurable: true
        });
    	
    },
    reDefineListeners: function(object, listeners) {
    	
    	if (object.listeners) {
    		
    		Zen.define(object, 'listeners', {
	            value: this.create(object.listeners),
	            enumerable: false,
	            writable: true,
	            configurable: true
	        });
    	}
    	
    	var Collection = this.import('containers.collection');
    	var Map = this.import('containers.map');
    	
    	var mappedListeners = new Map(listeners);
    	
    	mappedListeners.each(function(value, key) {
    		if (typeof value == 'function') {
    			//this.defineListener(object, key, value);
    			this.define(object.listeners, key, {
		            value: value,
		            enumerable: true,
		            writable: true,
		            configurable: true
		        });
    		}
    		else if (value instanceof Collection) {
    			value.each(function(val) {
    				//this.defineListener(object, key, val);
    				this.define(object.listeners, key, {
			            value: val,
			            enumerable: true,
			            writable: true,
			            configurable: true
			        });
    			}, this);
    		}
    	}, this);
    },
    defineNonEnumerableProperty: function(object, property, value) {
        this.define(object, property, {
            value: value,
            enumerable: false,
            writable: true,
            configurable: true
        });
    },
    defineNonEnumerableProperties: function(object, properties) {
    	
    	var Map = this.import('containers.map');
    	
        var mappedProps = new Map(properties);
        
        mappedProps.each(function(value, key) {
        	this.defineNonEnumerableProperty(object, key, value);
        }, this);
    },
    create: Object.create,
    import: function(component) {
    	
        if (!component) {
            throw 'Illegal module name!';
        }
    	var Dependencies = require('/library/dependencies');

        var parts = component.split("."), currentContext = Dependencies;

        if (parts.length == 0) {
            return require(component);
        }

        for (var i = 0; i < parts.length; ++i) {
            if (!currentContext[parts[i]]) {
                Ti.API.error(component);
                throw 'Component not found exception';
            }
            currentContext = currentContext[parts[i]];
        }

        return require(currentContext);
        
    },
    extend: extend
};

module.exports = Zen;