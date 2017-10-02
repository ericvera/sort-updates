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
//TODO
sortValue(after, before);
```
Returns a value between the after and before.

```js
//TODO
import sortValue from 'sort-updates';

const value = sortValue(0, 1);

console.log(value);
// Output: 0.5
```

# Input => Output
* undefined, 0 => -1
* 0, undefined => 1
* 0, 1 => 0.5
* 0, 0.5 => 0.3
* 0, 0.1 => 0.05

# License
[MIT](https://github.com/ericvera/sort-updates/blob/master/LICENSE)