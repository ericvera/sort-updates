// Always run from the compiled version which is the one published
import sortUpdates from '../lib/sort-updates'

describe('insert-sorted', () => {
  it('can insert on empty list', () => {
    const list = []
    const itemToInsert = { id: '6ba3e8f', sortKey: undefined }
    const sortUpdatesIndex = 0

    const expectedUpdtes = [
      { id: '6ba3e8f', sortKey: 0 }
    ]

    let updates = sortUpdates(sortUpdatesIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert at the top of the list on a list with a single item', () => {
    const list = [
      { id: 'aba348f', sortKey: 0 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortKey: undefined }
    const sortUpdatesIndex = 0

    const expectedUpdtes = [
      { id: '8ba3e8f', sortKey: -1 }
    ]

    let updates = sortUpdates(sortUpdatesIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert at the end of the list', () => {
    const list = [
      { id: 'aba348f', sortKey: 0 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortKey: undefined }
    const sortUpdatesIndex = 1

    const expectedUpdtes = [
      { id: '8ba3e8f', sortKey: 1 }
    ]

    let updates = sortUpdates(sortUpdatesIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have space', () => {
    const list = [
      { id: 'aba348f', sortKey: 0 },
      { id: '5ba348f', sortKey: 5 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortKey: undefined }
    const sortUpdatesIndex = 1

    const expectedUpdtes = [
      { id: '8ba3e8f', sortKey: 3 }
    ]

    let updates = sortUpdates(sortUpdatesIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert at the end', () => {
    const list = [
      { id: 'aba348f', sortKey: 0 },
      { id: '5ba348f', sortKey: 5 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortKey: undefined }
    const sortUpdatesIndex = 2

    const expectedUpdtes = [
      { id: '8ba3e8f', sortKey: 6 }
    ]

    let updates = sortUpdates(sortUpdatesIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have no space and end at the beggining', () => {
    const list = [
      { id: 'aba348f', sortKey: 0 },
      { id: '5ba348f', sortKey: 1 },
      { id: '6ba348f', sortKey: 2 },
      { id: '9ba348f', sortKey: 3 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortKey: undefined }
    const sortUpdatesIndex = 3
    const expectedUpdtes = [
      { id: '8ba3e8f', sortKey: 2 },
      { id: '6ba348f', sortKey: 1 },
      { id: '5ba348f', sortKey: 0 },
      { id: 'aba348f', sortKey: -1 }
    ]

    let updates = sortUpdates(sortUpdatesIndex, itemToInsert, list, { decimalLimit: 0 })
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have no space when there are 2 items', () => {
    const list = [
      { id: 'aba348f', sortKey: 0 },
      { id: '5ba348f', sortKey: 1 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortKey: undefined }
    const sortUpdatesIndex = 1
    const expectedUpdtes = [
      { id: '8ba3e8f', sortKey: 0 },
      { id: 'aba348f', sortKey: -1 }
    ]

    let updates = sortUpdates(sortUpdatesIndex, itemToInsert, list, { decimalLimit: 0 })
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have no space and end somewhere that is not the end', () => {
    const list = [
      { id: 'aba348f', sortKey: 0 },
      { id: '5ba348f', sortKey: 1 },
      { id: '6ba348f', sortKey: 5 },
      { id: '9ba348f', sortKey: 6 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortKey: undefined }
    const sortUpdatesIndex = 3
    const expectedUpdtes = [
      { id: '8ba3e8f', sortKey: 5 },
      { id: '6ba348f', sortKey: 3 }
    ]

    let updates = sortUpdates(sortUpdatesIndex, itemToInsert, list, { decimalLimit: 0 })
    expect(updates).toEqual(expectedUpdtes)
  })

  it('throws on decimalLimit above limit', () => {
    const list = [
      { id: 'aba348f', sortKey: 0 },
      { id: '5ba348f', sortKey: 1 },
      { id: '6ba348f', sortKey: 5 },
      { id: '9ba348f', sortKey: 6 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortKey: undefined }
    const sortUpdatesIndex = 3

    expect(() => {
      sortUpdates(sortUpdatesIndex, itemToInsert, list, { decimalLimit: 26 })
    }).toThrow()
  })
})
