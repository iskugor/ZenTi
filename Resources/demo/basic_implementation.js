var ZenTi = require('/library/zen_ti');


//basic wrapper
function TiWrapper(props) {
    this.setProperties(props);
}
 
Object.defineProperties(TiWrapper.prototype, {
    __TiElement: {
        value: null,
        enumerable: false,
        writable: true,
        configurable: true
    },
    __TiConstructor: {
        value: Ti.UI.createView,
        enumerable: false,
        writable: false,
        configurable: true
    },
    __getTiElement: {
        value: function() {
            if (!this.__TiElement) {
                this.__TiElement = this.__TiConstructor(this.getProperties())
            }
            return this.__TiElement;
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    getProperties: {
        value: function() {
            var props = {};
            for (var p in this) {
                props[p] = this[p];
            }
            return props;
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    setProperties: {
        value: function(props) {
            if (this.__TiElement) {
                this.__TiElement.applyProperties(props);
                for (var p in props) {
                    this[p] = props[p];
                }
            }
            else {
                for (var p in props) {
                    this[p] = props[p];
                }
            }
        },
        enumerable: false,
        writable: false,
        configurable: true
    },
    on: {
        value: function(type, callback) {
            this.__getTiElement().addEventListener(type, callback);
        },
        enumerable: false,
        writable: false,
        configurable: true
    }
});


function TiWrapperExtended() {

}

ZenTi.extend(TiWrapperExtended, TiWrapper);

ZenTi.defineProperties(TiWrapperExtended.prototype, {
    height: 100,
    width: 100,
    backgroundColor: '#fff'
});




/* run */

exports.run = function(win) {

    var w1 = new TiWrapper({ backgroundColor: '#000' });
    var w2 = new TiWrapperExtended();

    w2.on('click', function() {
        alert('TiWrapperExtended object is instance of TiWrapper? ' + (w2 instanceof TiWrapper));
    });

    // need to use "__getTiElement" directly  because "Window" will throw an exception
    // since "TiWrapper" is not instance of "ZenElement"
    win.__getTiElement().add(w1.__getTiElement());
    win.__getTiElement().add(w2.__getTiElement());

};

