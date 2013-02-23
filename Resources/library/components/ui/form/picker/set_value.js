'use strict';

var Zen = require('/library/zen_ti');

var Picker = Zen.import('ui.picker');

function setValue(component) {
    
    if (component instanceof Picker) {
        Object.defineProperty(component, 'setValue', {
            value: function(svalue) {
                svalue = +svalue;
                if (!isNaN(svalue)) {
                    
                    var keys = this.getData().getKeys();
                    
                    this.setSelectedRow(keys.indexOf(svalue.toString()));
                    this.value = this.getData().get(svalue);
                    
                    //FIXME: row part probably does not work
                    this.trigger('change', { row: this.value });
                }
            },
            enumerable: false,
            writable: false,
            configurable: true
        });
    }
    else {
        throw "Illegal 'setValue' parameter: " + component;
    }
};

module.exports = setValue;