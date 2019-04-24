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
  //   C = "C"
}

interface Person {
  readonly type: PersonType;
  age: number;
}

interface Admin extends Person {
  readonly type: PersonType.ADMIN;
}

const a: Person = { age: 1, type: PersonType.SOMEONE };

type IsNever<T> = T extends never ? true : never;

function asdasxa<T extends keyof typeof PersonType>(b: T[], a: Exclude<keyof typeof PersonType, T> extends never ? true : never) {}

function asdasxa2<T extends PersonType>(b: T[], a: Exclude<PersonType, T> extends never ? true : never) {}

asdasxa2([PersonType.ADMIN, PersonType.SOMEONE], true);

const createEnumParser = <Enum>() => <Value extends Enum>(b: Value[], a: Exclude<Enum, Value> extends never ? true : never) => {
  return (value: unknown): Enum | null => {
    for (const enumValue of b) {
      if (enumValue === value) {
        return enumValue;
      }
    }
    return null;
  };
};

const parsePersonType = createEnumParser<PersonType>()([PersonType.ADMIN, PersonType.SOMEONE], true);

const isPersonTypeSafe = createTypeGuard(parsePersonType);

// type EQ<A, B> = A extends B ? (B extends A ? true : never) : never;

// function test<A, B>(a: A, b: B): boolean {
//   return true;
// }

// type All<T> = Exclude<keyof typeof PersonType, T> extends never ? T : never;
// const qweqweasxxa: Exclude<keyof typeof PersonType, "ADMIN" | "SOMEONE" | "aaa"> extends never ? true : never = true;

// const qweqweqweq: EQ<Admin, Admin> = true;

// const aasdaxa: typeof PersonType = [];

// type AAA = Exclude<"ADMIN", "ADMIN">;

// const qweqweqw: EQ<Exclude<"ADMIN", "ADMIN">, never> = true;

// const aasdas: All<PersonType.ADMIN | PersonType.SOMEONE> = PersonType.ADMIN;

// function abc<T>(b: All<T>): boolean {
//   return true;
// }

// const createEnumTypeGuard = <E>(obj: object) => (val: unknown): val is E => {
//   return true;
// };

const isPersonType = createTypeGuard<PersonType>(value => {
  const keys: PersonType[] = [];

  switch (value) {
    case PersonType.ADMIN:
    case PersonType.SOMEONE:
      return value;
  }

  return null;
});

function parsePerson(value: unknown): Person | null {
  if (typeof value === "object" && value) {
    if (hasProperties(value, "type", "age")) {
      const { type, age } = value;
      if (typeof age === "number" && typeof type === "string") {
        if (isPersonType(type)) {
          return { type, age };
        }
      }
    }
  }

  return null;
}

function parseAdmin(value: Person): Admin | null {
  const { age, type } = value;
  if (type === PersonType.ADMIN) {
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
