var Zen = require('/library/zen_ti');

var View = Zen.import('ui.view');

var Theme = Zen.import('ui.theme').ScrollView;

function ScrollView(configuration) {
    this.setProperties(configuration);
}

Zen.extend(ScrollView, View);

ScrollView.prototype.setProperties(Theme);

Object.defineProperty(ScrollView.prototype, '__TiConstructor', {
    value: Ti.UI.createScrollView,
    enumerable: false,
    writable: false,
    configurable: true
});

module.exports = ScrollView;