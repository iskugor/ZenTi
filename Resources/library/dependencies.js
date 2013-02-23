'use strict';

var Zen = require('/library/zen_ti');

var Paths = Zen.getPaths();

var Dependencies = {
	utils: Paths.utils,
	navigation: Paths.navigation,
	containers: {
		collection: Paths.containers + 'collection',
		list: Paths.containers + 'list',
		map: Paths.containers + 'map'
	},
    ui: {
    	element: Paths.ui + 'element',
    	control: Paths.ui + 'control',
    	container: Paths.ui + 'container',
    	context: Paths.ui + 'context',
    	action_bar: Paths.ui + 'action_bar',
    	button: Paths.ui + 'button',
    	input: Paths.ui + 'input',
    	label: Paths.ui + 'label',
    	option_dialog: Paths.ui + 'option_dialog',
    	picker: Paths.ui + 'picker',
        scroll_view: Paths.ui + 'scroll_view',
    	scrollable_view: Paths.ui + 'scrollable_view',
    	simple_table_view: Paths.ui + 'simple_table_view',
    	simple_table_view_row: Paths.ui + 'simple_table_view_row',
    	slider: Paths.ui + 'slider',
    	'switch': Paths.ui + 'switch',
    	tab_group: Paths.ui + 'tab_group',
    	tab: Paths.ui + 'tab',
    	table_view: Paths.ui + 'table_view',
    	table_view_section: Paths.ui + 'table_view_section',
    	table_view_row: Paths.ui + 'table_view_row',
    	text_area: Paths.ui + 'text_area',
    	text_field: Paths.ui + 'text_field',
    	theme: Paths.ui + 'theme',
    	toolbar: Paths.ui + 'toolbar',
    	view: Paths.ui + 'view',
    	window: Paths.ui + 'window'
    },
    form: {
    	get_value: Paths.form + 'get_value',
    	set_value: Paths.form + 'set_value',
    	picker: {
   			get_value: Paths.form + 'picker/get_value',
   			set_value: Paths.form + 'picker/set_value'
    	}
    }
};

module.exports = Dependencies;