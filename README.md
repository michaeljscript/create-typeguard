# Create Type Guard

Simple package for creating type-safe type guards for TypeScript.

## What problem is being solved?

```ts
interface Person {
  age: number;
  name: string;
}

function isPerson(data: unknown): data is Person {
  return typeof data === 'object' && data && Object.hasOwnProperty.call(data, 'name');
}

// Oooops, you forgot to check if the `age` property does exist in `data`.
// Oooops, you forgot to check the type of the `name` property. Is it a string? Is it a number?
// Oooops, you forgot to check the type of the `age` property. Is it a string? Is it a number?

// With create-typeguard this won't happen.
```

## How does it work?
This package creates type-safe type guards from a parsers, because parsers will warn us if we make a mistake!

## Usage

```ts
import { createTypeGuard, hasProperties } from "create-typeguard";

interface Person {
  age: number;
  name: string;
}

// Our parser function that is type-safe
function parsePerson(data: unknown): Person | null {

  if (typeof data === 'object' && data && hasProperties(data, 'name', 'age')) {
    const { name, age } = data;

    if (typeof name === 'string' && typeof age === 'number') {
      return { name, age };
    }
  }

  return null;
}

// This is now a type-safe typeguard for Person!
const isPerson = createTypeGuard(parsePerson);


const maybePerson: unknown = response.body;

if (isPerson(maybePerson)) {
    // maybePerson is Person
    console.log(`${maybePerson.name} is ${maybePerson.age} years old.`);
}

```

## Usage 2 - Without defining a separate parse function 

```ts
import { createTypeGuard, hasProperties } from "create-typeguard";

interface Person {
  age: number;
  name: string;
}

// You do not have to create a separate parse function.
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

## Why create-typeguard?
Read more at this blog post https://medium.com/@michalszorad/typescript-keeping-type-guards-safe-and-up-to-date-2457d52bd722
