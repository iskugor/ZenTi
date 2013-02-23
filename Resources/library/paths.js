'use strict';

var root = '/';

var library = root + 'library/';

var components = library + 'components/';
var containers = library + 'containers/';

var dependencies = library + 'dependencies/';

var utils = library + 'utils';
var uiComponents = components + 'ui/';
var uiForm = uiComponents + 'form/';

var modules = root + 'modules/';

var paths = {
    library: library,
    utils: utils,
    components: components,
    containers: containers,
    dependencies: dependencies,
    ui: uiComponents,
    form: uiForm,
    modules: modules
};

module.exports = paths;