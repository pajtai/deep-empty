'use strict';

var chai = require('chai'),
    removeEmpty = require('../index.js'),
    _ = require('lodash');

chai.should();

describe('remove-empty', function() {


    describe('customization', function() {
        it('can pass in custom keeper function', function() {
            removeEmpty({'one' : {'two' : [], 'three': ''}}, isAKeeper)
                .should.deep.equal({'one' : {'two' : []}});
        });

        function isAKeeper(value) {
            return  (_.isDate(value) || _.isFunction(value) || _.isArray(value)) ||     // all dates and functions are kept
                (!_.isObject(value) && !_.isString(value)) ||   // all things that are not objects or strings are kept
                !_.isEmpty(value);                              // only non empty strings and objects are kept
        }
    });

    it('handles arrays as the base object', function() {
        removeEmpty([{}, {}, 1, []]).should.deep.equal([1]);
    });

    it('handles objects as the base object', function() {
        removeEmpty({ a: { b: { c: 'a', d: {}}}}).should.deep.equal({ a: { b: { c : 'a'}}});
    });

    describe('removes', function() {
        it('empty arrays', function() {
            removeEmpty({ key : [] }).should.deep.equal({});
        });

        it('empty objects', function() {
            removeEmpty({ key : {} }).should.deep.equal({});
        });

        it('empty strings', function() {
            removeEmpty(['']).should.deep.equal([]);
        });

        it('objects created with constructors that have no fields and only added prototype methods', function() {

            function Test() {

            }

            Test.prototype.test = function() { return 42; };

            removeEmpty({a: new Test}).should.deep.equal({});
        });

        it('deeply nested empty objects and arrays', function() {
            removeEmpty({
                key : [ 'a', {
                    foo : [[[],[{},{}],[[[[[[[]]]]]]]], {a:{b:{c:{d:{e:{}}}}}}]
                }]
            }).should.deep.equal({
                    key:['a']
                });
        });
    });

    describe('does not remove', function() {
        it('null', function() {
            removeEmpty([ null ]).should.deep.equal([null]);
        });

        it('undefined', function() {
            removeEmpty({ a: undefined }).should.deep.equal({ a: undefined });
        });

        it('the number 0', function() {
            removeEmpty([0]).should.deep.equal([0]);
        });

        it('date objects', function() {
            var date = new Date;
            removeEmpty({d: date}).should.deep.equal({d: date});
        });

        it('functions', function() {
            var f = function() { return 'hey'; };
            removeEmpty([f]).should.deep.equal([f]);
        });

        it('objects created with constructors that have fields', function() {
            var test = new Test;

            function Test() {
                this.test = 42;
            }

            removeEmpty({ a: test }).should.deep.equal({ a: test });
        });
    });
});
