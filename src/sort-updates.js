'use strict'

import sortValue from 'sort-value'

// Return the list of update to make to items (id and sortKey)
export default function (insertBeforeIndex, itemToInsert, list, options) {
  // Assumptions:
  // - list is sorted
  // - it contains all items prior to insertBeforeIndex
  let updates = []
  let currentInsertBeforeIndex = insertBeforeIndex
  let newItemKey = null

  let beforeIndex = currentInsertBeforeIndex - 1
  let afterIndex = currentInsertBeforeIndex
  let beforeKey = beforeIndex < 0 ? undefined : list[beforeIndex].sortKey
  let afterKey = afterIndex === list.length ? undefined : list[afterIndex].sortKey

  newItemKey = sortValue(beforeKey, afterKey, options)

  // In the most common case we get back a key so optimize for that
  if (newItemKey !== null) {
    updates.push({
      id: itemToInsert.id,
      sortKey: newItemKey
    })

    return updates
  }

  // In the rare case where we reach the limit we need to shift items up
  // - First update the item to insert with the current sortKey, then keep going until there is a key
  updates.push({
    id: itemToInsert.id,
    sortKey: list[beforeIndex].sortKey
  })

  let currentIdIndex = beforeIndex
  beforeIndex = currentIdIndex - 1
  afterIndex = currentIdIndex
  beforeKey = beforeIndex < 0 ? undefined : list[beforeIndex].sortKey
  // Note: No need to check it at the end since in the case where at the end newItemKey will not be null
  afterKey = list[afterIndex].sortKey
  newItemKey = sortValue(beforeKey, afterKey, options)

  // - Then starting at the before item begin shifting down until we can get a key
  while (newItemKey === null) {
    beforeIndex = currentIdIndex - 2
    afterIndex = currentIdIndex - 1
    beforeKey = beforeIndex < 0 ? undefined : list[beforeIndex].sortKey
    // Note: No need to check it at the end since in the case where at the end newItemKey will not be null
    afterKey = list[afterIndex].sortKey

    updates.push({
      id: list[currentIdIndex].id,
      sortKey: afterKey
    })

    newItemKey = sortValue(beforeKey, afterKey, options)
    currentIdIndex--
  }

  updates.push({
    id: list[currentIdIndex].id,
    sortKey: newItemKey
  })

  return updates
}
