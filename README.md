# deep-empty  [![Build Status](https://travis-ci.org/pajtai/deep-empty.png?branch=master)](https://travis-ci.org/pajtai/deep-empty)

This method does a depth first removal of "empty" values ( [], {}, '') from collections (arrays & objects). 

For example, it will  return an empty object for the following:
 
 ```
require('deep-empty')({ key : [ '', { foo: {}, bar: [] } ] })      => {}
```

It will return `[false]` for the following:

```
require('deep-empty')([[], false, {}])                             => [ false ]
```

The method can optionally be customized in two ways.

1. You can pass in the values to keep when iterating over a collection.
1. You can pass in the things that should not be considered a collection to iterate over. 

```
deepEmpty(object[, toKeep[, toSkip]])
```

The defaults for the two methods above are:

```
function toKeep(value) {
    return  (_.isDate(value) || _.isFunction(value)) ||     // all dates and functions are kept
            (!_.isObject(value) && !_.isString(value)) ||   // all things that are not object or string are kep
            !_.isEmpty(value);                              // only non empty strings and objects are kept
}

function toSkip(value) {
    return !_.isObject(value) || _.isDate(value) || _.isFunction(value);
}
```
