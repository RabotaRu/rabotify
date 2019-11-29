import { test } from '@util/testing';
import { getObjectValueByPath } from 'util/helpers';

const someObj = {
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

const anotherObj = Object.create(null);
anotherObj.d = '111';
anotherObj.e = null;
anotherObj.f = undefined;

test('getObjectValueByPath()', () => {
  it('should work', () => {
    expect(getObjectValueByPath(someObj, 'a')).toBe(1);
    expect(getObjectValueByPath(someObj, 'b')).toBe(2);
    expect(getObjectValueByPath(someObj, 'c')).toBe(undefined);
    expect(getObjectValueByPath(someObj, 'd')).toEqual({ d1: 41, d2: 42, d3: null, d4: undefined });
    expect(getObjectValueByPath(someObj, 'd.d1')).toBe(41);
    expect(getObjectValueByPath(someObj, 'd.d2')).toBe(42);
    expect(getObjectValueByPath(someObj, 'd.d3')).toBe(null);
    expect(getObjectValueByPath(someObj, 'd.d4')).toBe(undefined);
    expect(getObjectValueByPath(someObj, 'd.d5')).toBe(undefined);
    expect(getObjectValueByPath(null, 'd.d4')).toBe(undefined);
    expect(getObjectValueByPath(undefined, 'd.d4')).toBe(undefined);
    expect(getObjectValueByPath(Object.create(null), 'd.d4')).toBe(undefined);
    expect(getObjectValueByPath(anotherObj, 'd')).toBe('111');
    expect(getObjectValueByPath(anotherObj, 'e')).toBe(null);
    expect(getObjectValueByPath(anotherObj, 'f')).toBe(undefined);
  });
});
