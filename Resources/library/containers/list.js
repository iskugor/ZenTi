'use strict';

var Zen = require('/library/zen_ti');

var Collection = Zen.import('containers.collection');

function List(Container) {
    if (Container) {
        this.setContainer(Container);
    }
};

Zen.extend(List, Collection);

Object.defineProperties(List.prototype, {
	__ContainerFactory: {
	    value: function() {
	        return [];
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	removeContainer: {
	    value: function() {
	        this.getContainer().length = 0;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	append: {
	    value: function(value) {
	        return this.add(value, this.getContainer().length);
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
	getKey: {
	    value: function(value) {
	        return this.getContainer().indexOf(value);
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getKeys: {
	    value: function(value) {
	    	
	        var keys = [];
	        
	        this.each(function(value, key) {
	        	this.push(key);
	        }, keys);
	        
	        return keys;
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
	each: {
	    value: function(callback, thisArg) {
	        this.getContainer().forEach(callback, thisArg || this);
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	some: {
	    value: function(callback, thisArg) {
	        this.getContainer().some(callback, thisArg || this);
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	every: {
	    value: function(callback, thisArg) {
	        this.getContainer().every(callback, thisArg || this);
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	indexOf: {
	    value: function(value) {
	        return this.getContainer().indexOf(value);
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	valueExists: {
	    value: function(value) {
	        return (this.getContainer().indexOf(value) > -1) ? true : false;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getValues: {
	    value: function(value) {
	        return this.getContainer();
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	remove: {
	    value: function(index) {
	        this.getContainer().splice(index, 1);
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	length: {
	    //value: 0,
	    enumerable: false,
	    //writable: true,
	    configurable: false,
	    get: function() {
	        return this.getContainer().length;
	    },
	    set: function(length) {
	        this.getContainer().length = length;
	    }
	},
	clone: {
	    value: function() {
	        
	        var newObject = new List(this.getContainer().slice(0));
	        
	        return newObject;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	toString: {
	    value: function() {
	        return "[object ZenList]";
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	stringify: {
	    value: function() {
	        return this.getContainer().join(', ');
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	}
});

Object.defineProperty(List.prototype, 'removeAll', Object.getOwnPropertyDescriptor(List.prototype, 'removeContainer'));

module.exports = List;
