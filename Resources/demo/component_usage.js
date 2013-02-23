'use strict';

var ZenTi = require('/library/zen_ti');

var Window = ZenTi.import('ui.window');
var View = ZenTi.import('ui.view');
var Button = ZenTi.import('ui.button');

exports.run = function(win) {

	var get_child = new Button({
		title: 'Get child',
		top: 10
	});

	get_child.on('click', function() {
		alert('Object: ' + win.getChildren().get('get_child') + ', object title: ' + win.getChildren().get('get_child').getProperties().title);
	});

	win.add(get_child, 'get_child');
	
	var get_children = new Button({
		title: 'Get children',
		top: 10
	});

	get_children.on('click', function() {
		win.getChildren().each(function(value) {
			alert('Object: ' + value + ', object title: ' + value.getProperties().title);
		});
	});

	win.add(get_children, 'get_children');

	var get_parent = new Button({
		title: 'Get parent',
		top: 10
	});

	get_parent.on('click', function() {
		alert('Object: ' + this.getParent());
	});

	win.add(get_parent, 'get_parent');
	
	var throw_exception = new Button({
		title: 'Add window to view',
		top: 10
	});

	throw_exception.on('click', function() {
		var view = new View();
		view.add(new Window(), 'win');
	});

	win.add(throw_exception, 'throw_exception');

};