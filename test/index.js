'use strict';

var chai = require('chai'),
    compact = require('../index.js');

chai.should();

describe('objects', function() {
    it('removes empty arrays', function() {
        compact({ key : [] }).should.deep.equal({});
    });

    it('does not remove undefined', function() {
        compact([{}, undefined, []]).should.deep.equal([undefined]);
    });

    it('removes deeply nested', function() {
        compact({
            key : [ 'a', {
                foo : [[[]]]
            }]
        }).should.deep.equal({
                key:['a']
            });
    })
});

describe('arrays', function() {
    it('removes empty arrays', function() {
        compact([ [], [] ]).should.deep.equal([]);
    });
});