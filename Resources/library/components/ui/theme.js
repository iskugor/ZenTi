'use strict';

var FILL = Ti.UI.FILL;
var SIZE = Ti.UI.SIZE;

var Default = {
    Window: {

    },
    View: {

    },
    TableView: {

    },
    TableViewRow: {
        height: 75,
        font: {
        	fontSize: 20
        }
    },
    ScrollView: {
        
    },
    Picker: {
        height: 60,
        selectionIndicator: true
    },
    Button: {
        width: 175,
        height: 35,
        backgroundColor: '#999',
        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
    },
    Label: {
        left: 20,
        height: 70,
        font: {
            fontSize: 18
        },
        color: '#ccc'
    },
    Switch: {
        width: 75,
        height: 75
    },
    Slider: {
    	min: 0,
    	max: 100
    },
    TextField: {
        width: 200,
        height: 40,
        backgroundColor: '#fff'
    },
    TextArea: {
        height: 200
    }
};

module.exports = Default;