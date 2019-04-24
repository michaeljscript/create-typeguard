type Parser<OUTPUT, INPUT> = (value: INPUT) => OUTPUT | null;

function hasProperties<T extends object, K extends string>(obj: T, ...keys: K[]): obj is T & { [J in K]: unknown } {
  return !!obj && keys.every(key => obj.hasOwnProperty(key));
}

const createTypeGuard = <Type extends INPUT, INPUT = unknown>(parse: Parser<Type, INPUT>) => (value: INPUT): value is Type => {
  return parse(value) !== null;
};

enum PersonType {
  ADMIN = "ADMIN",
  SOMEONE = "SOMEONE"
}

interface Person {
  readonly type: PersonType;
  age: number;
}

interface Admin extends Person {
  readonly type: PersonType.ADMIN;
}

const a: Person = { age: 1, type: PersonType.SOMEONE };

function parsePerson(value: unknown): Person | null {
  if (typeof value === "object" && value) {
    if (hasProperties(value, "type", "age")) {
      const { type, age } = value;
      if (typeof age === "number" && typeof type === "string") {
        if (type === PersonType.ADMIN || type === PersonType.SOMEONE) {
          return { type, age };
        }
      }
    }
  }

  return null;
}

function parseAdmin(value: Person): Admin | null {
  if (value.type === PersonType.ADMIN) {
    const { age, type } = value;
    return { age, type };
  }

  return null;
}

const isAdmin3 = createTypeGuard(parseAdmin);

const isPerson2 = createTypeGuard(parsePerson);

const isPerson = createTypeGuard<Person>(value => {
  if (typeof value === "object" && value) {
    if (hasProperties(value, "type", "age")) {
      const { type, age } = value;
      if (typeof age === "number" && typeof type === "string") {
        if (type === PersonType.ADMIN || type === PersonType.SOMEONE) {
          return { type, age };
        }
      }
    }
  }

  return null;
});

const isAdmin = createTypeGuard<Admin, Person>(p => {
  switch (p.type) {
    case PersonType.ADMIN:
      return {
        age: p.age,
        type: p.type
      };
  }

  return null;
});

const isAdmin2 = createTypeGuard<Admin, Person>(p => {
  switch (p.type) {
    case PersonType.ADMIN:
      return {
        age: p.age,
        type: p.type
      };
  }

  return null;
});

if (isAdmin(a)) {
  // a.type === PersonType.ADMIN
}

export { hasProperties, createTypeGuard };
export default createTypeGuard;
