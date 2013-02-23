'use strict';

var Zen = require('/library/zen_ti');

var Control = Zen.import('ui.control');

var Theme = Zen.import('ui.theme').Button;

function Button(configuration) {
    this.setProperties(configuration);
};

Zen.extend(Button, Control);

Object.defineProperty(Button.prototype, '__TiConstructor', {
    value: Ti.UI.createButton,
    enumerable: false,
    writable: false,
    configurable: true
});

Button.prototype.setProperties(Theme);

module.exports = Button;