# Create Type Guard

Simple package for creating safe type guards for TypeScript.


## Usage

```ts
import { createTypeGuard, hasProperties } from "create-typeguard";

interface Person {
  age: number;
  name: string;
}

function parsePerson(data: unknown): Person | null {

  if (typeof data === 'object' && data && hasProperties(data, 'name', 'age')) {
    const { name, age } = data;

    if (typeof name === 'string' && typeof age === 'number') {
      return { name, age };
    }
  }

  return null;
}

const isPerson = createTypeGuard(parsePerson);


const maybePerson: unknown = response.body;

if (isPerson(maybePerson)) {
    // maybePerson is Person
    console.log(`${maybePerson.name} is ${maybePerson.age} years old.`);
}

```

## Usage 2

```ts
import { createTypeGuard, hasProperties } from "create-typeguard";

interface Person {
  age: number;
  name: string;
}

const isPerson = createTypeGuard<Person>(data => {
  if (typeof data === 'object' && data && hasProperties(data, 'name', 'age')) {
    const { name, age } = data;

    if (typeof name === 'string' && typeof age === 'number') {
      return { name, age };
    }
  }
  
  return null;
});


const maybePerson: unknown = response.body;

if (isPerson(maybePerson)) {
    // maybePerson is Person
    console.log(`${maybePerson.name} is ${maybePerson.age} years old.`);
}

```
