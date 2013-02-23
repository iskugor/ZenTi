'use strict';

var ZenTi = require('/library/zen_ti');

var Window = ZenTi.import('ui.window');
var View = ZenTi.import('ui.view');
var ScrollableView = ZenTi.import('ui.scrollable_view');
var Button = ZenTi.import('ui.button');

function TiConfView(backgroundColor, height) {
	this.backgroundColor = backgroundColor;
	this.height = height || this.height;
}

ZenTi.extend(TiConfView, View);

/*ZenTi.defineProperties(TiConfView.prototype, {
	
});*/

function TiConfComponent() {

}

ZenTi.extend(TiConfComponent, View);

ZenTi.defineProperties(TiConfComponent.prototype, {
	height: View.prototype.DIMENSION_FILL
});

ZenTi.defineMethods(TiConfComponent.prototype, {
	init: function() {
		this.add(this.createTop(), 'Top');
		this.add(this.createMiddle(), 'Middle');
		this.add(this.createBottom(), 'Bottom');

		this.getChildren().get('Top').setProperties({
			top: 0,
			height: '33%'
		});

		this.getChildren().get('Middle').setProperties({
			top: '33%',
			height: '33%'
		});

		this.getChildren().get('Bottom').setProperties({
			top: '66%',
			height: '33%'
		});
	},
	createTop: function() {
		return new TiConfView('#f00');
	},
	createMiddle: function() {
		return new TiConfView('#0f0');
	},
	createBottom: function() {
		return new TiConfView('#00f');
	}
});

function TiConfComponentExtended() {

}

ZenTi.extend(TiConfComponentExtended, TiConfComponent);

ZenTi.defineMethods(TiConfComponentExtended.prototype, {
	createMiddle: function() {

		var view = new ScrollableView({
			height: '33%',
			backgroundColor: '#fff'
		});

		var v1 = new TiConfView('#ff0', '100%');
		var v2 = new TiConfView('#f0f', '100%');
		var v3 = new TiConfView('#0ff', '100%');

		view.add(v1, 'v1');
		view.add(v2, 'v2');
		view.add(v3, 'v3');

		return view;
	}
});

exports.run = function(win) {

	/*var win = new Window({
		backgroundColor: '#000'
	});*/

	var c = new TiConfComponent();

	c.getChildren().get('Middle').on('click', function() {
		
		var win2 = new Window({
			backgroundColor: '#000'
		});

		win2.add(view, 'TiConfComponentExtended');

		win.getParent().open(win2);

		// win.remove('TiConfComponent');

		win.animate({
			right: 0
		});
		
	});

	var view = new TiConfComponentExtended();

	/*view.setProperties({
		left: 0
	});*/

	/*view.on('click', function() {
		win.close();
	});*/

	win.add(c, 'TiConfComponent');


	// win.open();
};