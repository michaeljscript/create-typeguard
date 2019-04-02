type Parser<T> = (value: unknown) => T | null;

function hasProperties<T extends object, K extends string>(obj: T, ...keys: K[]): obj is T & { [J in K]: unknown } {
    return !!obj && !keys.some(key => !obj.hasOwnProperty(key));
}


const createTypeGuard = <T>(parse: Parser<T>) => (value: unknown): value is T => {
    return parse(value) !== null;
};

export {hasProperties, createTypeGuard};
export default createTypeGuard;
