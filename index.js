'use strict';

var _ = require('lodash');

/**
 * This method does a depth first removal of empty values ( [], {}, ''). Other falsey values are preserved.
 * It will  return an empty object for the following:
 *
 *     { key : [ false, { foo: undefined, bar: [] } ] }
 *
 * @type {compact}
 */
module.exports = function(object) {
    // Clone so original is untouched
    return compact(_.clone(object, true));
};

function isEnum(object) {
    // Clone so any deletions don't put object into hash table mode
    return _.clone((_.isArray(object) || _.isObject(object)) && !_.isEmpty(object), true);
}

function compact(object) {
    var index;
    if (_.isArray(object)) {
        index = object.length;
        while(index--) {
            iterate(object, object[index], index);
        }
    } else {
        _.each(object, iterate.bind(null, object));
    }
    return object;
}

function iterate(object, value, key) {
    if (isEnum(object)) {
        compact(value);
    }

    if ((_.isArray(value))) {
        value = _.compact(value);
    }
    if ((_.isArray(value) || _.isString(value) || _.isObject(value)) && _.isEmpty(value)) {
        if (_.isArray(object)) {
            object.splice(key, 1);
        } else {
            delete object[key];
        }
    }
}
