var Zen = require('/library/zen_ti');

var View = Zen.import('ui.view');
var Container = Zen.import('ui.container');

var Theme = Zen.import('ui.theme').ScrollableView;

function ScrollableView(configuration) {
    this.setProperties(configuration);
}

Zen.extend(ScrollableView, View);

ScrollableView.prototype.setProperties(Theme);

Object.defineProperties(ScrollableView.prototype, {
    __TiConstructor: {
        value: Ti.UI.createScrollableView,
        enumerable: false,
        writable: false,
        configurable: true
    },
    __addTiElement: {
        value: function(component) {
        	if (component && component.__getTiElement) {
        		this.__getTiElement().addView(component.__getTiElement());
        	}
            else {
                Ti.API.error("" + component);
                throw 'Illegal argument exception';
            }
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    __removeTiElement: {
        value: function(component) {
        	if (component && component.__getTiElement) {
        		this.__getTiElement().removeView(component.__getTiElement());
        	}
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    scrollToView: {
        value: function(component) {
            if (component instanceof Container) {
                this.__getTiElement().scrollToView(component.__getTiElement());
            }
            else if (typeof component == 'number') {
                this.__getTiElement().scrollToView(component);
            }
            else {
                Ti.API.error(this.toString() + ' : Illegal argument - ' + component);
                throw 'Illegal argument exception!';
            }
        },
        enumerable: false,
        writable: false,
        configurable: true
    }
});

module.exports = ScrollableView;