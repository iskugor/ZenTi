'use strict';

var Zen = require('/library/zen_ti');

var Input = Zen.import('ui.input');

var Theme = Zen.import('ui.theme').TextField;

function TextField(configuration) {
    this.setProperties(configuration);
};

Zen.extend(TextField, Input);

TextField.prototype.setProperties(Theme);

Object.defineProperties(TextField.prototype, {
    __TiConstructor: {
        value: Ti.UI.createTextField,
        enumerable: false,
        writable: false,
        configurable: true
    },
    getValueProperty: {
        value: function() {
            return this.__getTiElement().value;
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    setValueProperty: {
        value: function(value) {
            if (value) {
                this.__getTiElement().value = value.toString();
            }
            else {
                this.__getTiElement().value = '';
            }
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    KEYBOARD_NUMERIC: {
        value: Ti.UI.KEYBOARD_NUMBER_PAD,
        enumerable: false,
        writable: false,
        configurable: true
    },
    //TODO: refactor (make Android specific component)
    SOFT_KEYBOARD_SHOW_ON_FOCUS: {
        value: Ti.UI.Android ? Ti.UI.Android.SOFT_KEYBOARD_SHOW_ON_FOCUS : '',
        enumerable: false,
        writable: false,
        configurable: true
    },
    SOFT_KEYBOARD_HIDE_ON_FOCUS: {
        value: Ti.UI.Android ? Ti.UI.Android.SOFT_KEYBOARD_HIDE_ON_FOCUS : '',
        enumerable: false,
        writable: false,
        configurable: true
    },
    focus: {
        value: function() {
            this.__getTiElement().focus();
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    blur: {
        value: function() {
            this.__getTiElement().blur();
        },
        enumerable: false,
        writable: false,
        configurable: true
    }
});

module.exports = TextField;