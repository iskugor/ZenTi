'use strict';

var Zen = require('/library/zen_ti');

var Container = Zen.import('ui.container');

var Theme = Zen.import('ui.theme').View;

function View(configuration) {
    this.setProperties(configuration);
}

Zen.extend(View, Container);

View.prototype.setProperties(Theme);

Object.defineProperty(View.prototype, '__TiConstructor', {
    value: Ti.UI.createView,
    enumerable: false,
    writable: false,
    configurable: true
});

module.exports = View;