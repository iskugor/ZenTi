'use strict';

var Zen = require('/library/zen_ti');

var Picker = Zen.import('ui.picker');

function getValue(component) {
    
    if (component instanceof Picker) {
        Object.defineProperty(component, 'getValue', {
            value: function() {
                var value;
                var pickerRow = this.getSelectedRow(0);
                if (pickerRow) {
                    value = pickerRow.title;
                }
                else {
                    value = this.value;
                }
                
                return this.getData().getKey(value);
            },
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    else {
        throw "Illegal 'getValue' parameter: " + component;
    }
}

module.exports = getValue;