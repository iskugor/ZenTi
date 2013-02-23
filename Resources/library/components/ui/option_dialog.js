'use strict';

var Zen = require('/library/zen_ti');

var Input = Zen.import('ui.input');
var Theme = Zen.import('ui.theme').OptionDialog;
var Utils = Zen.import('utils');
var Collection = Zen.import('containers.collection');
var List = Zen.import('containers.list');

function OptionDialog(configuration) {
    this.setProperties(configuration);
};

Zen.extend(OptionDialog, Input);

OptionDialog.prototype.setProperties(Theme);

Object.defineProperties(OptionDialog.prototype, {
    __TiConstructor: {
        value: Ti.UI.createOptionDialog,
        enumerable: false,
        writable: false,
        configurable: true
    },
    //TODO rethink this part, data should be added automatically to the OptionDialog
    __data: {
        value: null,
        enumerable: false,
        writable: false,
        configurable: true
    },
    __dataContainer: {
        value: List,
        enumerable: false,
        writable: false,
        configurable: true
    },
    __createDataContainer: {
        value: function() {
            if (!this.__data) {
                this.__data = new this.__dataContainer();
            }
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    getData: {
        value: function() {
            if (!this.__data) {
                this.__createDataContainer();
            }
            return this.__data;
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    setData: {
        value: function(items) {
            
            var dialog = this.__getTiElement();
            
            var data = this.getData();
            
            data.setContainer(items);
            
            dialog.setOptions(data.getValues());
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    __createWrapperedListener: {
        value: function(callback, thisValue) {
        	
    		var listener = (function(thisVal, dialog) {
    			return function(e) {
    	            
    	            var newE = {};
    	            
    	            for (var i in e) {
    	            	newE[i] = e[i];
    	            }
    	            
    	            var data = dialog.getData();
    	            var value = data.getValues()[e.index];
    	            
    	            newE.index = data.getKey(value);
    	            
    	            callback.call(thisVal, newE);
    	        };
    		})(thisValue || this, this);
            
            return listener;
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    show: {
        value: function() {
            this.__getTiElement().show();
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    hide: {
        value: function() {
            this.__getTiElement().hide();
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    serialize: {
        value: function() {
            var thisSerialization = this.getProperties();
            var thisData = this.getData();
            thisSerialization.data = thisData;
            
            var serialized = JSON.stringify(thisSerialization);
            delete thisSerialization.data;
            
            thisSerialization = null;
            return serialized;
        },
        enumerable: false,
        writable: false,
        configurable: true
    }
});

module.exports = OptionDialog;