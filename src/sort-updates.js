'use strict'

import sortValue from 'sort-value'

// Return the list of update to make to items (key and sortValue)
export default function (insertBeforeIndex, itemToInsert, list, options = {keyName: 'key', sortValueName: 'sortValue'}) {
  // Assumptions:
  // - list is sorted
  // - it contains all items prior to insertBeforeIndex
  let updates = []
  let currentInsertBeforeIndex = insertBeforeIndex
  let newItemKey = null

  let beforeIndex = currentInsertBeforeIndex - 1
  let afterIndex = currentInsertBeforeIndex
  let beforeKey = beforeIndex < 0 ? undefined : list[beforeIndex][options.sortValueName]
  let afterKey = afterIndex === list.length ? undefined : list[afterIndex][options.sortValueName]

  newItemKey = sortValue(beforeKey, afterKey)

  // In the most common case we get back a key so optimize for that
  if (newItemKey !== null) {
    updates.push({
      key: itemToInsert[options.keyName],
      sortValue: newItemKey
    })

    return updates
  }

  // In the rare case where we reach the limit we need to shift items up
  // - First update the item to insert with the current sortValue, then keep going until there is a key
  updates.push({
    key: itemToInsert[options.keyName],
    sortValue: list[beforeIndex][options.sortValueName]
  })

  let currentkeyIndex = beforeIndex
  beforeIndex = currentkeyIndex - 1
  afterIndex = currentkeyIndex
  beforeKey = beforeIndex < 0 ? undefined : list[beforeIndex][options.sortValueName]
  // Note: No need to check it at the end since in the case where at the end newItemKey will not be null
  afterKey = list[afterIndex][options.sortValueName]
  newItemKey = sortValue(beforeKey, afterKey)

  // - Then starting at the before item begin shifting down until we can get a key
  while (newItemKey === null) {
    beforeIndex = currentkeyIndex - 2
    afterIndex = currentkeyIndex - 1
    beforeKey = beforeIndex < 0 ? undefined : list[beforeIndex][options.sortValueName]
    // Note: No need to check it at the end since in the case where at the end newItemKey will not be null
    afterKey = list[afterIndex][options.sortValueName]

    updates.push({
      key: list[currentkeyIndex][options.keyName],
      sortValue: afterKey
    })

    newItemKey = sortValue(beforeKey, afterKey)
    currentkeyIndex--
  }

  updates.push({
    key: list[currentkeyIndex][options.keyName],
    sortValue: newItemKey
  })

  return updates
}
