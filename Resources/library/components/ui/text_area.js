'use strict';

var Zen = require('/library/zen_ti');

var Theme = Zen.import('ui.theme').TextArea;
var TextField = Zen.import('ui.text_field');

function TextArea(configuration) {
    this.setProperties(configuration);
};

Zen.extend(TextArea, TextField);

Object.defineProperty(TextArea.prototype, '__TiConstructor', {
    value: Ti.UI.createTextArea,
    enumerable: false,
    writable: false,
    configurable: true
});

TextArea.prototype.setProperties(Theme);

module.exports = TextArea;