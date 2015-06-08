var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var _ = require('lodash');
var deepEmpty = require('./index.js');
var obj = [
    {},
    {}
    [[[[[[[[[[[[[[]]]]]]]]]]]]]],
    {a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{a:{}}}}}}}}}}}}}}}}}}}}}}}}}}},
    'b'
];

function newObj() {
    return _.clone(obj, true);
}

// add tests
suite
    .add('deepEmpty#old', function() {
        deepEmptyOld(newObj());
    })
    .add('deepEmpty#new', function() {
        deepEmpty(newObj());
    })

// add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
// run async
    .run({ 'async': true });

// Below is the old library - it is twice as slow as the new method

function deepEmptyOld(object) {
    // cloning removed for speed testing - old is still much slower even without cloning
    return compact(object);
}

function isEnum(object) {
    // Clone so any deletions don't put object into hash table mode
    return (_.isArray(object) || _.isObject(object)) && !_.isEmpty(object);
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