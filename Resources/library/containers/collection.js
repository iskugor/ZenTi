'use strict';

function Collection() {
    
};

Collection.prototype = Object.create(null);

Object.defineProperties(Collection.prototype, {
	__ContainerFactory: {
	    value: null,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__Container: {
	    value: null,
	    enumerable: false,
	    writable: true,
	    configurable: true
	},
	setContainer: {
	    value: function(container) {
	        this.__Container = container;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	createContainer: {
	    value: function() {
	        if (!this.__Container) {
	            if (!this.__ContainerFactory()) {
	                throw 'No container factory present!! ' + this.toString();
	            }
	            this.__Container = this.__ContainerFactory();
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getContainer: {
	    value: function() {
	        if (!this.__Container) {
	            this.createContainer();
	        }
	        return this.__Container;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	removeContainer: {
	    value: function() {
	        if (this.__Container) {
	            this.__Container = null;
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	add: {
	    value: function(value, index) {
	        this.getContainer()[index] = value;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	get: {
	    value: function(index) {
	        return this.getContainer()[index];
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getAll: {
	    value: function() {
	        return this.getContainer();
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	replace: {
	    value: function(value, index) {
	        return this.getContainer()[index] = value;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	each: {
	    value: function(callback, thisArg) {
	        var container = this.getContainer();
	        var thisVal = thisArg || container;
	        var brakeOrContinue = false;
	        
	        for (var name in container) {
	            brakeOrContinue = callback.call(thisVal, container[name], name, container);
	            if (brakeOrContinue !== undefined) {
	                brakeOrContinue = !!brakeOrContinue;
	                if (brakeOrContinue) {
	                    continue;
	                }
	                else {
	                    break;
	                }
	            }
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	remove: {
	    value: function(index) {
	        return delete this.getContainer()[index];
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	clone: {
	    value: function() {
	        return new this.constructor(this.getContainer());
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	toString: {
	    value: function() {
	        return "[object ZenCollection]";
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	}
	
});

Object.defineProperty(Collection.prototype, 'removeAll', Object.getOwnPropertyDescriptor(Collection.prototype, 'removeContainer'));

module.exports = Collection;
