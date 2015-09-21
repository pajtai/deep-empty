'use strict';

var _ = require('lodash');

/**
 * This method does a depth first removal of empty values ( [], {}, ''). Other falsey values are preserved.
 * It will  return an empty object for the following:
 *
 *     { key : [ '', { foo: {}, bar: [] } ] }
 *
 * @type {deepEmpty}
 */
module.exports = deepEmpty;
function deepEmpty(object, keeper, skip) {

    var isArray;

    skip    = skip      || returnAsIs;
    if (skip(object)) {
        return object;
    }
    keeper  = keeper    || isAKeeper;

    isArray = _.isArray(object);

    return _.reduce(object, function (acc, value, key) {

        value = deepEmpty(value, keeper, skip);

        if (keeper(value)) {
            isArray ? acc.push(value) : acc[key] = value;
        }

        return acc;
    }, isArray ? [] : {});
}

function returnAsIs(value) {
    return !_.isObject(value) || _.isDate(value) || _.isFunction(value);
}

function isAKeeper(value) {
    return  (_.isDate(value) || _.isFunction(value)) ||     // all dates and functions are kept
            (!_.isObject(value) && !_.isString(value)) ||   // all things that are not objects or strings are kept
            !_.isEmpty(value);                              // only non empty strings and objects are kept
}
