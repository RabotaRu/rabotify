'use strict';

var _testing = require('@util/testing');

var _helpers = require('util/helpers');

var someObj = {
  a: 1,
  b: 2,
  // c: 3,  // It's ok, test for undefined
  d: {
    d1: 41,
    d2: 42,
    d3: null,
    d4: undefined
  }
};

var anotherObj = Object.create(null);
anotherObj.d = '111';
anotherObj.e = null;
anotherObj.f = undefined;

(0, _testing.test)('getObjectValueByPath()', function () {
  it('should work', function () {
    expect((0, _helpers.getObjectValueByPath)(someObj, 'a')).toBe(1);
    expect((0, _helpers.getObjectValueByPath)(someObj, 'b')).toBe(2);
    expect((0, _helpers.getObjectValueByPath)(someObj, 'c')).toBe(undefined);
    expect((0, _helpers.getObjectValueByPath)(someObj, 'd')).toEqual({ d1: 41, d2: 42, d3: null, d4: undefined });
    expect((0, _helpers.getObjectValueByPath)(someObj, 'd.d1')).toBe(41);
    expect((0, _helpers.getObjectValueByPath)(someObj, 'd.d2')).toBe(42);
    expect((0, _helpers.getObjectValueByPath)(someObj, 'd.d3')).toBe(null);
    expect((0, _helpers.getObjectValueByPath)(someObj, 'd.d4')).toBe(undefined);
    expect((0, _helpers.getObjectValueByPath)(someObj, 'd.d5')).toBe(undefined);
    expect((0, _helpers.getObjectValueByPath)(null, 'd.d4')).toBe(undefined);
    expect((0, _helpers.getObjectValueByPath)(undefined, 'd.d4')).toBe(undefined);
    expect((0, _helpers.getObjectValueByPath)(Object.create(null), 'd.d4')).toBe(undefined);
    expect((0, _helpers.getObjectValueByPath)(anotherObj, 'd')).toBe('111');
    expect((0, _helpers.getObjectValueByPath)(anotherObj, 'e')).toBe(null);
    expect((0, _helpers.getObjectValueByPath)(anotherObj, 'f')).toBe(undefined);
  });
});