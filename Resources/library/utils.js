var Utils = {};

Utils.floatToInt = function(float_value) {
    if (!this.isNumber(float_value)) {
        Ti.API.warn('[ZenUtil floatToInt] Wrong function parameter.');
        Ti.API.debug(float_value);
        return '';
    }
    return float_value.toString();
};

Utils.capitaliseFirstLetter = function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

function mixin(target, source) {
    
    if (!Utils.isObject(target)) {
        return;
    }
    if (!Utils.isObject(source)) {
        return;
    }
    
    var name, s, i;
    for(name in source) {
        s = source[name];
        if (target[name] !== undefined) {
            if (Utils.isObject(target[name])) {
                if (Utils.isObject(s)) {
                    mixin(target[name], s);
                }
            }
            else {
                //target[name] = s;
            }
        }
        else {
            if (Utils.isObject(s)) {
                target[name] = Utils.cloneObject(s);
            }
            else if (Utils.isArray(s)) {
                target[name] = s.slice(0);
            }
            else {
                target[name] = s;
            }
        }
    }
    
};

//TODO: verify
Utils.isObject = function(obj) {
    //or part is fix for Titanium bug (change of object constructor property)
    if (obj && obj.constructor && ((obj.constructor === Object) || /^function Object/.test(obj.constructor.toString()))) {
        return true;
    }
    return false;
};

Utils.isArray = function(arr) {
    //or part is fix for Titanium bug (change of array constructor property)
    if (arr && arr.constructor && (arr.constructor === Array || /^function Array/.test(arr.constructor.toString()))) {
        return true;
    }
    return false;
};

Utils.isDate = function(date) {
    if (date && date.constructor && (date.constructor === Date || /^function Date/.test(date.constructor.toString()))) {
        return true;
    }
    return false;
};

var isInteger = /^[+-]?[1-9]*[0-9]+$/;
Utils.isInteger = function(int_val) {
    return isInteger.test(int_val);
};

Utils.isNumber = function(numb) {
    if (typeof numb == 'number' && !isNaN(numb)) {
        return true;
    }
    return false;
};

var isFloat = /^[+-]?([0-9]*\.[0-9]*)$/;
Utils.isFloat = function(float_val) {
    return isFloat.test(float_val);
};

Utils.isString = function(string_val) {
    if (typeof string_val === 'string') {
        return true;
    }
    return false;
};

Utils.isBoolean = function(bool_val) {
    if (bool_val === true || bool_val === false) {
        return true;
    }
    return false;
};

//TODO: verify
Utils.isFunction = function(func) {
    if (typeof func == 'function') {
        return true;
    }
    return false;
};

/*
 * Converts an integer (unicode value) to a char
 */
Utils.itoa = function(ival) {
   return String.fromCharCode(ival);
};

/*
 * Converts a char into to an integer (unicode value)
 */
Utils.atoi = function(aval) {
   return aval.charCodeAt();
};

Utils.copyPrototypeValues = function(obj) {
    for (var o in obj) {
        obj[o] = obj[o];
    }
};

module.exports = Utils;