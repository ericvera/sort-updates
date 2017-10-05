'use strict'

import sortValue from 'sort-value'

// Return the list of update to make to items (key and sortValue)
export default function (insertBeforeIndex, itemToInsert, list, options = {keyName: 'id', sortValueName: 'sortValue'}) {
  // Assumptions:
  // - list is sorted
  // - it contains all items prior to insertBeforeIndex
  let updates = []
  let currentInsertBeforeIndex = insertBeforeIndex
  let newSortValue = null

  let beforeIndex = currentInsertBeforeIndex - 1
  let afterIndex = currentInsertBeforeIndex
  let beforeSortValue = beforeIndex < 0 ? undefined : list[beforeIndex][options.sortValueName]
  let afterSortValue = afterIndex === list.length ? undefined : list[afterIndex][options.sortValueName]

  newSortValue = sortValue(beforeSortValue, afterSortValue)

  // In the most common case we get back a key so optimize for that
  if (newSortValue !== null) {
    let item = {}
    item[options.keyName] = itemToInsert[options.keyName]
    item[options.sortValueName] = newSortValue

    updates.push(item)

    return updates
  }

  // In the rare case where we reach the limit we need to shift items up
  // - First update the item to insert with the current sortValue, then keep going until there is a key
  let item = {}
  item[options.keyName] = itemToInsert[options.keyName]
  item[options.sortValueName] = list[beforeIndex][options.sortValueName]

  updates.push(item)

  let currentkeyIndex = beforeIndex
  beforeIndex = currentkeyIndex - 1
  afterIndex = currentkeyIndex
  beforeSortValue = beforeIndex < 0 ? undefined : list[beforeIndex][options.sortValueName]
  // Note: No need to check it at the end since in the case where at the end newSortValue will not be null
  afterSortValue = list[afterIndex][options.sortValueName]
  newSortValue = sortValue(beforeSortValue, afterSortValue)

  // - Then starting at the before item begin shifting down until we can get a key
  while (newSortValue === null) {
    beforeIndex = currentkeyIndex - 2
    afterIndex = currentkeyIndex - 1
    beforeSortValue = beforeIndex < 0 ? undefined : list[beforeIndex][options.sortValueName]
    // Note: No need to check it at the end since in the case where at the end newSortValue will not be null
    afterSortValue = list[afterIndex][options.sortValueName]

    let item = {}
    item[options.keyName] = list[currentkeyIndex][options.keyName],
    item[options.sortValueName] = afterSortValue

    updates.push(item)

    newSortValue = sortValue(beforeSortValue, afterSortValue)
    currentkeyIndex--
  }

  item = {}
  item[options.keyName] = list[currentkeyIndex][options.keyName]
  item[options.sortValueName] = newSortValue

  updates.push(item)

  return updates
}
