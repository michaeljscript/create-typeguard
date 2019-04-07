type Parser<OUTPUT, INPUT> = (value: INPUT) => OUTPUT | null;

function hasProperties<T extends object, K extends string>(obj: T, ...keys: K[]): obj is T & { [J in K]: unknown } {
    return !!obj && keys.every(key => obj.hasOwnProperty(key));
}


const createTypeGuard = <T, K = unknown>(parse: Parser<T, K>) => (value: K): value is K & T => {
    return parse(value) !== null;
};

enum PersonType {
    ADMIN = 'ADMIN',
    SOMEONE = 'SOMEONE',
};

interface Person {
    readonly type: PersonType;
    age: number;
}

interface Admin extends Person {
    readonly type: PersonType.ADMIN;
}

const a: Person = { age: 1, type: PersonType.SOMEONE };

const isAdmin = createTypeGuard<Admin, Person>(p => {

    switch (p.type) {
        case PersonType.ADMIN:
            return {
                age: p.age,
                type: p.type,

            }
    }

    return null;
});


if (isAdmin(a)) {
    // a.type === PersonType.ADMIN
}

export { hasProperties, createTypeGuard };
export default createTypeGuard;
