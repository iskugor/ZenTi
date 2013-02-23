'use strict';

var Zen = require('/library/zen_ti');

var Context = Zen.import('ui.context');
var Tab = Zen.import('ui.tab');
var List = Zen.import('containers.list');

function Window(configuration) {
	this.setProperties(configuration);
}

Zen.extend(Window, Context);

Object.defineProperties(Window.prototype, {
	__TiConstructor : {
		value : Ti.UI.createWindow,
		enumerable : false,
		writable : false,
		configurable : true
	},
	__addTiElement : {
		value : function(component) {
            
            //TODO: move action bar code to Android specific component
			var ActionBar = Zen.import('ui.action_bar');
			var Element = Zen.import('ui.element');
			var Context = Zen.import('ui.context');

			var thisElement = this.__getTiElement();

			if ( component instanceof ActionBar) {

				thisElement.activity.onCreateOptionsMenu = function(e) {

					component.getChildren().each(function(child) {

						var childTiElement = child.__getTiElement();

						var item = e.menu.add({
							title : child.title
						});

						item.showAsAction = child.showAs;

						if (child.showAs === ActionBar.prototype.SHOW_ALWAYS) {
							item.actionView = childTiElement;
						} else {
							item.addEventListener('click', function() {
								child.trigger('click');
							});
						}

					});

				};

			}
			else if (( component instanceof Element) && !( component instanceof Context)) {
				var componentTiElement = component.__getTiElement();
				thisElement.add(componentTiElement);
			}
			else {
				throw this.toString() + ' -> (__addTiElement) : Illegal argument ' + component;
			}
		},
		enumerable : false,
		writable : false,
		configurable : true
	},
	__canBeAddedTo: {
		value: new List([ Tab ]),
		enumerable : false,
		writable : false,
		configurable : true
	}
});

module.exports = Window; 