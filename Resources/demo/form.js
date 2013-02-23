'use strict';

var ZenTi = require('/library/zen_ti');

var Window = ZenTi.import('ui.window');
var View = ZenTi.import('ui.view');
var Button = ZenTi.import('ui.button');
var TextField = ZenTi.import('ui.text_field');
var getValue = ZenTi.import('form.get_value');

exports.run = function(win) {

	getValue(win);

	var form_view = new View({
		layout: View.prototype.LAYOUT_VERTICAL,
		height: '60%'
	});

	var username = new TextField({
		top: 10
	});
	
	var firstname = new TextField({
		top: 10
	});

	getValue(form_view);
	getValue(username);
	getValue(firstname);

	form_view.add(username, 'username');
	form_view.add(firstname, 'firstname');

	var toolbar = new View({
		height: '40%',
		layout: View.prototype.LAYOUT_VERTICAL
	})

	var add_last_name = new Button({
		title: 'Add last name',
		top: 20
	});

	add_last_name.on('click', function() {
		var lastname = new TextField({
			top: 10
		});
		getValue(lastname);
		form_view.add(lastname, 'last_name');
	});

	toolbar.add(add_last_name, 'add_last_name');
	
	var on_submit = new Button({
		title: 'Submit',
		top: 10
	});

	on_submit.on('click', function() {
		alert(JSON.stringify(form_view.getValue()));
	});

	toolbar.add(on_submit, 'on_submit');

	win.add(form_view, 'form_view');
	win.add(toolbar, 'toolbar');

};