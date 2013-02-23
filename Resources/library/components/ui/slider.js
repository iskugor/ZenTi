'use strict';

var Zen = require('/library/zen_ti');

var Input = Zen.import('ui.input');

var Theme = Zen.import('ui.theme').Slider;

function Slider(configuration) {
    this.setProperties(configuration);
};

Zen.extend(Slider, Input);

Object.defineProperties(Slider.prototype, {
    __TiConstructor: {
        value: Ti.UI.createSlider,
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
            this.__getTiElement().value = value;
        },
        enumerable: false,
        writable: false,
        configurable: true
    }
});

Slider.prototype.setProperties(Theme);

module.exports = Slider;