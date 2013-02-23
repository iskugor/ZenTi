//TODO: move to Android specific dir

'use strict';

var Zen = require('/library/zen_ti');

var View = Zen.import('ui.view');

var Theme = Zen.import('ui.theme').ActionBar;

//TODO: see if this component is really necessary
//TODO: move it to Android specific components
function ActionBar(configuration) {
    this.setProperties(configuration);
};

Zen.extend(ActionBar, View);

ActionBar.prototype.setProperties(Theme);

var Android = Ti.Android || {};

Zen.defineConstants(ActionBar.prototype, {
	SHOW_ALWAYS: Android.SHOW_AS_ACTION_ALWAYS,
	SHOW_COLLAPSED: Android.SHOW_AS_ACTION_COLLAPSE_ACTION_VIEW,
	SHOW_IF_ROOM: Android.SHOW_AS_ACTION_IF_ROOM,
	SHOW_NEVER: Android.SHOW_AS_ACTION_NEVER,
	SHOW_WITH_TEXT: Android.SHOW_AS_ACTION_WITH_TEXT,
})

Zen.defineProperties(ActionBar.prototype, {
	showAs: Android.SHOW_AS_ACTION_ALWAYS
});

module.exports = ActionBar;