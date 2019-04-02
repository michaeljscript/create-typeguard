import { hasProperties } from '../index';

describe('create-typeguard', () => {

    describe('hasProperties', () => {
        it('should return false when the object has not any of the given property', () => {
            expect(hasProperties({ foo: 'bar' }, 'foo', 'test')).toBe(false);
        });

        it('should return true when the object has all of the properties', () => {
            expect(hasProperties({ foo: 'bar', bar: 'foo' }, 'foo', 'bar')).toBe(true);
        });
    });
});