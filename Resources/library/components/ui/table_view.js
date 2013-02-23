'use strict';

var Zen = require('/library/zen_ti');

var Container = Zen.import('ui.container');
var Collection = Zen.import('containers.collection');
var Map = Zen.import('containers.map');

var TableViewSection = Zen.import('ui.table_view_section');
var TableViewRow = Zen.import('ui.table_view_row');

var SimpleTableView = Zen.import('ui.simple_table_view');

var Theme = Zen.import('ui.theme').TableView;

function TableView(configuration) {
	this.setProperties(configuration);
}

//FIXME: see if "TableView" should inherit "SimpleTableView"!!!
Zen.extend(TableView, SimpleTableView);

TableView.prototype.setProperties(Theme);

Object.defineProperties(TableView.prototype, {
	__ContainerConstructor : {
		value : Map,
		enumerable : false,
		writable : true,
		configurable : true
	},
	__TiConstructor : {
		value : Ti.UI.createTableView,
		enumerable : false,
		writable : false,
		configurable : true
	},
	__addSingle : {
		value : function(component, name) {

			if (name && component instanceof TableViewSection) {
				var children = this.getChildren();
				var exists = children.get(name);
				if (exists) {
					Ti.API.error('Component already exists: ' + name + ' in ' + this.toString() + ' Use "replace" instead!');
					throw 'Illegal action exception';
				}
				this.__addTiElement(component);
				children.add(component, name);
				component.setParent(this);
			} else {
				Ti.API.error('Illegal arguments: ' + component + ' :: ' + name);
				Ti.API.info('Expected: Instance of TableViewSection and non-empty name string!');
				throw 'Illegal argument exception';
			}
		},
		enumerable : false,
		writable : false,
		configurable : true
	},
	__addCollection : {
		value : function(component) {
			var children = this.getChildren();
			var tiElement = this.__getTiElement();
			var childrenLength = children.length;
			var nativeSections = [], i = 0;
			component.each(function(value, key) {
				if ( value instanceof TableViewSection) {
					nativeSections[i++] = value.__getTiElement();
					this.getChildren().add(value, key);
					value.setParent(this);
				} else {
					Ti.API.error('Illegal value in "__addCollection" method! ' + value + ' :: ' + key);
					throw 'Illegal value exception!';
				}
			}, this);

			if (childrenLength > 0) {
				var data = [].concat(tiElement.data, nativeSections);
				tiElement.setData(data);
			}
			else {
				tiElement.setData(nativeSections);
			}

		},
		enumerable : false,
		writable : false,
		configurable : true
	},
	__addTiElement : {
		value : function(TiComponent) {
			if (TiComponent && typeof TiComponent.__getTiElement == 'function') {
				var TiElement = TiComponent.__getTiElement(), thisTiElement = this.__getTiElement();
				if ( TiComponent instanceof TableViewSection) {
					//TODO: "appendRow" works with sections?
					var sections = thisTiElement.data;
					sections[sections.length] = TiElement;
					thisTiElement.setData(sections);
				} else {
					Ti.API.warn('Illegal argument: ' + TiComponent + ' this value: ' + this);
				}
			} else {
				Ti.API.warn('Illegal argument: ' + TiComponent + ' this value: ' + this);
			}
		},
		enumerable : false,
		writable : false,
		configurable : true
	},
	__defaultSectionWrapperCreated : {
		value : false,
		enumerable : false,
		writable : true,
		configurable : true
	},
	replace : {
		value : function(section, name) {

			if (( section instanceof TableViewSection) && name) {

				var children = this.getChildren(), thisTiElement = this.__getTiElement();

				var old = children.get(name);

				var oldSecTiElement = old.__getTiElement();

				var secs = thisTiElement.data;
				
				var indexOf = secs.indexOf(oldSecTiElement);
				
				secs[indexOf] = section.__getTiElement();

				old.removeParent();
				
				thisTiElement.setData(secs);
				
				children.add(section, name);
				section.setParent(this);

			} else {
				Ti.API.warn('Illegal parameter! Row: ' + row + ' index: ' + index + ' this: ' + this);
				throw 'Illegal parameter exception';
			}
			return this;
		},
		enumerable : false,
		writable : false,
		configurable : true
	},
	__createWrapperedListener : {
		value : function(callback, thisValue) {

			var listener = (function(thisVal, thisTableView) {
				return function(e) {

					var newE = {};

					for (var i in e) {
						newE[i] = e[i];
					}

					//TODO: custom event handling, check other components also
					if (!e.section) {
						callback.call(thisVal, newE);
						return;
					}

					var nativeSection = e.section;

					var thisSections = thisTableView.getChildren();

					var foundSection;

					thisSections.each(function(value) {
						if (value && value.__getTiElement) {
							if (nativeSection === value.__getTiElement()) {
								foundSection = value;
								return false;
							}
						}
					});

					//TODO: check if this works
					newE.section = foundSection;

					var rowSectionIndex;

					var data = thisTableView.__getTiElement().data, index = e.index;

					for (var i = 0; i < data.length; ++i) {
						if (data[i].rows && data[i].rows.length) {
							if (index < data[i].rows.length) {
								break;
							}

							index -= data[i].rows.length;
						}
					}

					newE.index = index;

					newE.row = foundSection.get(index);

					var nativeSource = e.source;

					newE.source = (newE.row.__getTiElement() === nativeSource) ? newE.row : newE.row.__findSource(nativeSource);
					delete newE.rowData;

					callback.call(thisVal, newE);
				};
			})(thisValue || this, this);

			return listener;
		},
		enumerable : false,
		writable : false,
		configurable : true
	},
	removeAll : {
		value : function() {
			var children = this.getChildren();
			//TODO: see if this is necessary
			children.each(function(value) {
				if (value && value.removeAll) {
					value.removeAll();
					value.removeParent();
				}
			})
			var thisElement = this.__getTiElement();
			this.__removeChildrenContainer();
			thisElement.setData([]);

			return this;
		},
		enumerable : false,
		writable : false,
		configurable : true
	}
});

module.exports = TableView; 