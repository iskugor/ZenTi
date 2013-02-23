'use strict';

var Zen = require('/library/zen_ti');

var Element = Zen.import('ui.element');
var Collection = Zen.import('containers.collection');
//default
var ContainerConstructor = Zen.import('containers.map');

//abstract
function Container() {
    
}

Zen.extend(Container, Element);

Object.defineProperties(Container.prototype, {
	__ContainerConstructor: {
	    value: ContainerConstructor,
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	add: {
	    value: function(component, name) {
	        if (component instanceof Collection) {
	           this.__addCollection(component);
	        }
	        else {
	            this.__addSingle(component, name);
	        }
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__addSingle: {
	    value: function(component, name) {
	        
	        if (name === undefined) {
	            throw 'Illegal "__addSingle" argument: ' + name + ' :: ' + this.toString();
	        }
	        
	        if (component.__canBeAddedTo instanceof Collection) {
	        	var canBeAddedTo = false;
	            component.__canBeAddedTo.each(function(ElementConstructor) {
	            	if (this instanceof ElementConstructor) {
	            		canBeAddedTo = true;
	            	}
	            }, this);
	            if (!canBeAddedTo) {
	            	throw 'You tried to add unsupported component! ' + component + ' cannot be added to ' + this.toString();
	            }
	        }

	        if (this.__canAdd instanceof Collection) {
	        	var canAdd = false;
	            component.__canAdd.each(function(ElementConstructor) {
	            	if (this instanceof ElementConstructor) {
	            		canBeAddedTo = true;
	            	}
	            }, component);
	            
	            if (!canAdd) {
	            	throw 'You tried to add unsupported component! ' + component + ' cannot be added to ' + this.toString();
	            }
	        }
	        
	        var children = this.getChildren();
	        
	        var exists = children.get(name);
	        
	        if (exists) {
	        	Ti.API.error('Trying to add existing component, use "replace" instead!');
	        	Ti.API.info('Component: ' + component.toString() + ', name: ' + name);
	        	throw 'Illegal action exception';
	        }
	        
	        children.add(component, name);

	        //move below to crash app
	        this.__addTiElement(component);
	        
	        //FIXME: this line causes app crash (not crashing since 2.1)
	        component.setParent(this);
	        
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__addCollection: {
	    value: function(collection) {
	        collection.each(function(value, key) {
	        	this.__addSingle(value, key);
	        }, this);
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__addTiElement: {
	    value: function(TiComponent) {
	        if (TiComponent && typeof TiComponent.__getTiElement == 'function') {
	        	
	            var thisElement = this.__getTiElement();
	            var TiElement = TiComponent.__getTiElement();
	            
	            if (thisElement && TiElement) {
	            	thisElement.add(TiElement);
	            }
	            else {
	            	Ti.API.error('Illegal state: ' + thisElement + ' :: ' + TiElement);
	            	Ti.API.debug(TiComponent);
	            	Ti.API.debug(this);
	            	throw 'Illegal state exception';
	            }
	            
	        }
	        else {
	            Ti.API.error('Illegal parameter to "__addTiElement" function! ' + TiComponent + ' :: ' + this);
	            throw 'Illegal argument exception';
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__addTiElements: {
	    value: function(TiComponents) {
	        if (TiComponents instanceof Collection) {
	        	
	            var tiElems = [];


	            TiComponents.each(function(el) {
	            	if (el && el.__getTiElement) {
	            		this.push(el.__getTiElement());
	            	}
	            }, tiElems);
                //TODO: not sure will this work on Android
	            this.__getTiElement().add(tiElems);
	        }
	        else {
	            Ti.API.error('Illegal parameter to "__addTiElement" function! ' + TiComponent + ' :: ' + this);
	            throw 'Illegal argument exception';
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	remove: {
	    value: function(name) {
	        var component = this.get(name);
	        if (component) {
	            this.getChildren().remove(name);
	            component.removeParent();
	            this.__removeChildTiElement(component);
	        }
	        else {
	            Ti.API.warn('You tried to remove non-existing component: ' + name + ' from ' + this.toString());
	        }
	        
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__removeChildTiElement: {
	    value: function(component) {
	    	if (component && component.__getTiElement) {
	    		this.__getTiElement().remove(component.__getTiElement());
	    	}
	        else {
	        	Ti.API.warn('Illegal argument!');
	        	Ti.API.debug(component);
	        }
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	removeAll: {
	    value: function(name) {
	        
	        var children = this.getChildren();
	        
	        children.each(function(value) {
	        	value.removeParent();
	            this.__removeChildTiElement(value);
	        }, this);
	        
	        children.removeAll();
	        
	        return this;
	        
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	//TODO: buggy?
	get: {
	    value: function(name) {
	        
	        if (!this.__TiElement) {
	        	this.__createTiElement();
	        }
	        
	        return this.getChildren().get(name);
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	exists: function(name) {
		return !!this.get(name);
	},
	has: function(component) {
		return this.__getChildren().indexOf(component) > -1 ? true : false;
	},
	__children: {
	    value: null,
	    enumerable: false,
	    writable: true,
	    configurable: true
	},
	__createChildrenContainer: {
	    value: function() {
	        if (!this.__children) {
	            //ensure Titanium element is created!
	            if (typeof this.__ContainerConstructor == 'function') {
	                this.__children = new this.__ContainerConstructor();
	            }
	            else {
	                Ti.API.warn(this.toString() + ': No container constructor!');
	                throw 'Illegal state exception';
	            }
	        }
	        else {
	            //child container exists
	            Ti.API.warn(this + ' : "children" container exists');
	        }
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__removeChildrenContainer: {
	    value: function() {
	        this.__children = null;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	getChildren: {
	    value: function() {
	    	if (!this.__TiElement) {
	    		this.__createTiElement();
	    	}
	        if (!this.__children) {
	            this.__createChildrenContainer();
	        }
	        return this.__children;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	//TODO: this is not very intelligent, see how to improve this search mechanism
	__findSource: {
	    value: function(source) {
	    	var children = this.getChildren();
	    	var foundSource;
	    	
	    	children.each(function(value) {
	    		if (value && value.__getTiElement) {
	    			if (value.__getTiElement() === source) {
	    				foundSource = value;
	    			}
	    			else if (value instanceof Container) {
	    				foundSource = value.__findSource(source);
	    			}
	    		}
	    	}, this);
	    	
	    	return foundSource;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	__createListenerArgumentObject: {
	    value: function(e) {
	    	var newE = {};
	    	newE.type = e.type;
	    	var nativeElement = this.__getTiElement();
	    	if (nativeElement === e.source) {
	    		newE.source = this;
	    	}
	    	else {
	    		//FIXME: implement search
	    		newE.source = this.__findSource(e.source);
	    	}
	    	return e;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	replace: {
	    value: function(component, name) {
	    	//FIXME: need to add TiElement at specific position
	    	//FIXME: implement "insertAt"
	        this.remove(name);
	        this.add(component, name);
	        return this;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	LAYOUT_HORIZONTAL: {
	    value: 'horizontal',
	    enumerable: false,
	    writable: false,
	    configurable: true
	},
	LAYOUT_VERTICAL: {
	    value: 'vertical',
	    enumerable: false,
	    writable: false,
	    configurable: false
	},
	LAYOUT_ABSOLUTE: {
	    value: 'absolute',
	    enumerable: false,
	    writable: false,
	    configurable: false
	},
	//TODO: write better implementation
	serialize: {
	    value: function() {
	        
	        var serializedChildren = {};
	        var children = this.getChildren();
	        children.each(function(value, key) {
	            this[key] = value.serialize();
	        }, serializedChildren);
	        var thisProperties = this.getProperties();
	        thisProperties.children = serializedChildren;
	        var serializedString = JSON.stringify(thisProperties);
	        delete thisProperties.children;
	        thisProperties = null;
	        serializedChildren = null;
	        children = null;
	        return serializedString;
	    },
	    enumerable: false,
	    writable: false,
	    configurable: true
	}
});

module.exports = Container;