'use strict';

var Zen = require('/library/zen_ti');

var Collection = Zen.import('containers.collection');

function Map(Container) {
    if (Container) {
        this.setContainer(Container);
    }
};

Zen.extend(Map, Collection);

Object.defineProperties(Map.prototype, {
	__ContainerFactory: {
	    value: function() {
	        return {};
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getKeys: {
	    value: function() {
	        return Object.keys(this.getContainer());
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getKey: {
	    value: function(value) {
	        var retVal;
	        this.each(function(oValue, key) {
	            if (oValue == value) {
	                retVal = key;
	                return false;
	            }
	        });
	        return retVal;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getValues: {
	    value: function() {
	        var container = this.getContainer();
	        return Object.keys(container).map(function(objKey) {
	            return this[objKey];
	        }, container);
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	clone: {
	    value: function() {
	        
	        var newObject = new Map();
	        
	        this.each(function(value, name) {
	            this.add(value, name);
	        }, newObject);
	        
	        return newObject;
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
	        return this.getKeys().length;
	    },
	    set: function() {
	        
	    }
	},
	valueExists: {
	    value: function(value) {
	        for (var v in this) {
	            if (this[v] === value) {
	                return true;
	            }
	        }
	        return false;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	toString: {
	    value: function() {
	        return "[object ZenMap]";
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	serialize: {
	    value: function() {
	        return JSON.stringify(this.getContainer());
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	}
});

module.exports = Map;