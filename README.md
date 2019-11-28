## Diff a list of results

Write a function that takes two arrays full of objects and outputs a list of their changes, as seen below.

You can assume that the IDs of the objects will be persistent, but other values won't be. Don't assume that "name" and "quantity" are the only values to diff.

```js
const list = [
{
    id       : 1,
    name     : 'Barbara',
    quantity : 3,
},
{
    id       : 2,
    name     : 'Tom',
    quantity : 0,
},
{
    id       : 3,
    name     : 'Sam',
    quantity : 1,
},
];

const updatedList = [
// barb's name is changing
{
    id       : 1,
    name     : 'Barb',
    quantity : 3,
},
    // sam's quantity is changing
{
    quantity : 8,
    name     : 'Sam',
    id       : 3,
},
    // tom has been deleted
    // nelson is being added
{
    name     : 'Nelson',
    id       : 4,
    quantity : 6,
},
];

getDiffBetween(list, updatedList);
```

Should output:

```js
[
{
    type     : 'CHANGE',
    id       : 1,
    name     : 'Barb',
},
{
    type     : 'REMOVE',
    id       : 2,
},
{
    type     : 'CHANGE',
    id       : 3,
    quantity : 8,
},
{
    type     : 'ADD',
    id       : 4,
    name     : 'Nelson',
    quantity : 6,
},
]
```

## Solution

Exports from `index.js` as `getDiffBetween`. Run tests with `npm test`.
