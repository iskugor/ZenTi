'use strict';

var Zen = require('/library/zen_ti');

var Input = Zen.import('ui.input');
var Theme = Zen.import('ui.theme').Picker;
var Utils = Zen.import('utils');
var Collection = Zen.import('containers.collection');
var List = Zen.import('containers.list');

//FIXME: refactor
function Picker(configuration) {
    this.setProperties(configuration);
};

//FIXME: should inherit from "Container"?
Zen.extend(Picker, Input);

Picker.prototype.setProperties(Theme);

Object.defineProperty(Picker.prototype, {
    __TiConstructor: {
        value: Ti.UI.createPicker,
        enumerable: false,
        writable: false,
        configurable: true
    },
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
    //FIXME: use "add"
    setData: {
        value: function(items) {
            
            var picker = this.__getTiElement();
            
            var data = this.getData();
            
            data.setContainer(items);
            
            var picker_row, item, i, len = items.length, picker_data = [];
            
            var i = 0;
            data.each(function(value) {
                picker_data[i++] = Ti.UI.createPickerRow({ title: value });
            });
            
            picker.add(picker_data);
            
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    getRowTitle: {
        value: function(id) {
            return this.getData().get(id);
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    //FIXME: use "get/setValueProperty"
    setSelectedRow: {
        value: function(index) {
            if (Utils.isNumber(index)) {
                this.__getTiElement().setSelectedRow(0, index);
            }
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    getSelectedRow: {
        value: function() {
            var pickerRow = this.__getTiElement().getSelectedRow(0);
            if(pickerRow) {
                return pickerRow;
            }
            else {
                 return this.getData().get(this.value);
            }
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

module.exports = Picker;