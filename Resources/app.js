'use strict';

var ZenTi = require('/library/zen_ti');

var TabGroup = ZenTi.import('ui.tab_group');
var Window = ZenTi.import('ui.window');
var Tab = ZenTi.import('ui.tab');
var Button = ZenTi.import('ui.button');
var View = ZenTi.import('ui.view');


(function() {

	var tab_group = new TabGroup();

	var basic_tab = new Tab({
		title: 'Basic'
	});

	var basic_win = new Window();

	basic_tab.add(basic_win, 'basic_win');

	tab_group.once('open', function() {
		require('/demo/basic_implementation').run(this);
	}, basic_win);

	var component_usage_tab = new Tab({
		title: 'Usage'
	});

	var component_usage_win = new Window({
		layout: Window.prototype.LAYOUT_VERTICAL
	});

	component_usage_tab.add(component_usage_win, 'component_usage_win');

	component_usage_win.once('focus', function() {
		require('/demo/component_usage').run(this);
	});

	var composite_components_tab = new Tab({
		title: 'Composite'
	});

	var composite_components_win = new Window({
		layout: Window.prototype.LAYOUT_VERTICAL
	});

	composite_components_tab.add(composite_components_win, 'composite_components_win');

	composite_components_win.once('focus', function() {
		require('/demo/composite_components').run(this);
	});

	var form_tab = new Tab({
		title: 'Form'
	});

	var form_win = new Window({
		layout: Window.prototype.LAYOUT_VERTICAL
	});

	form_tab.add(form_win, 'form_win');

	form_win.once('focus', function() {
		require('/demo/form').run(this);
	});

	tab_group.add(basic_tab, 'basic_tab');
	tab_group.add(component_usage_tab, 'component_usage_tab');
	tab_group.add(composite_components_tab, 'composite_components_tab');
	tab_group.add(form_tab, 'form_tab');

	tab_group.open();

})();