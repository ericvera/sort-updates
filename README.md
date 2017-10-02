# sort-updates
A JavaScript utility library to determine updates needed to re-order an item in a sorted list.

<p>
  <a href="https://npmjs.org/package/sort-updates">
    <img src="https://img.shields.io/npm/v/sort-updates.svg?style=flat-square">
  </a>
</p>

# Usage

Install the module:

```sh
npm install sort-updates --save
```

```js
sortUpdates(insertAtIndex, itemToInsert, list);
```
Returns an array with objects that need to be updated in order to insert an item at the specified location. 

Whenever there is space (sortValues have a maximum of 25 decimal places) between the before and after, there will be a single update and the sort value for the item to insert will be approximaltely between the two items.

Whenever there is no space items will be shifted until there is space.

## Sample when there is space
```js
import sortUpdates from 'sort-updates';

const list = [
  { key: 'aba348f', sortValue: 0 },
  { key: '5ba348f', sortValue: 5 }
]
const itemToInsert = { key: '8ba3e8f', sortValue: undefined }
const insertAtIndex = 1

const expectedUpdtes = 

let updates = sortUpdates(insertAtIndex, itemToInsert, list)

console.log(updates);
// Output: [{ key: '8ba3e8f', sortValue: 3 }]
```

## Sample when there is no space
```js
import sortUpdates from 'sort-updates';

const list = [
  { key: 'aba348f', sortValue: 0 },
  { key: '5ba348f', sortValue: 0.0000000000000000000000001 },
  { key: '6ba348f', sortValue: 0.0000000000000000000000002 },
  { key: '9ba348f', sortValue: 0.0000000000000000000000003 }
]
const itemToInsert = { key: '8ba3e8f', sortValue: undefined }
const insertAtIndex = 3

let updates = sortUpdates(insertAtIndex, itemToInsert, list)

console.log(updates);
// Output: [
//  { key: '8ba3e8f', sortValue: 0.0000000000000000000000002 },
//  { key: '6ba348f', sortValue: 0.0000000000000000000000001 },
//  { key: '5ba348f', sortValue: 0 },
//  { key: 'aba348f', sortValue: -1 }
//]
```

# License
[MIT](https://github.com/ericvera/sort-updates/blob/master/LICENSE)