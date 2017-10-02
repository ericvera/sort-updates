// Always run from the compiled version which is the one published
import sortUpdates from '../lib/sort-updates'

describe('sort-updates', () => {
  it('can insert on empty list', () => {
    const list = []
    const itemToInsert = { key: '6ba3e8f', sortValue: undefined }
    const insertAtIndex = 0

    const expectedUpdtes = [
      { key: '6ba3e8f', sortValue: 0 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert at the top of the list on a list with a single item', () => {
    const list = [
      { key: 'aba348f', sortValue: 0 }
    ]
    const itemToInsert = { key: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 0

    const expectedUpdtes = [
      { key: '8ba3e8f', sortValue: -1 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert at the end of the list', () => {
    const list = [
      { key: 'aba348f', sortValue: 0 }
    ]
    const itemToInsert = { key: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 1

    const expectedUpdtes = [
      { key: '8ba3e8f', sortValue: 1 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have space', () => {
    const list = [
      { key: 'aba348f', sortValue: 0 },
      { key: '5ba348f', sortValue: 5 }
    ]
    const itemToInsert = { key: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 1

    const expectedUpdtes = [
      { key: '8ba3e8f', sortValue: 3 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert at the end', () => {
    const list = [
      { key: 'aba348f', sortValue: 0 },
      { key: '5ba348f', sortValue: 5 }
    ]
    const itemToInsert = { key: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 2

    const expectedUpdtes = [
      { key: '8ba3e8f', sortValue: 6 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have no space and end at the beggining', () => {
    const list = [
      { key: 'aba348f', sortValue: 0 },
      { key: '5ba348f', sortValue: 0.0000000000000000000000001 },
      { key: '6ba348f', sortValue: 0.0000000000000000000000002 },
      { key: '9ba348f', sortValue: 0.0000000000000000000000003 }
    ]
    const itemToInsert = { key: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 3
    const expectedUpdtes = [
      { key: '8ba3e8f', sortValue: 0.0000000000000000000000002 },
      { key: '6ba348f', sortValue: 0.0000000000000000000000001 },
      { key: '5ba348f', sortValue: 0 },
      { key: 'aba348f', sortValue: -1 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have no space when there are 2 items', () => {
    const list = [
      { key: 'aba348f', sortValue: 0 },
      { key: '5ba348f', sortValue: 0.0000000000000000000000001 }
    ]
    const itemToInsert = { key: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 1
    const expectedUpdtes = [
      { key: '8ba3e8f', sortValue: 0 },
      { key: 'aba348f', sortValue: -1 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have no space and end somewhere that is not the end', () => {
    const list = [
      { key: 'aba348f', sortValue: 0 },
      { key: '5ba348f', sortValue: 0.0000000000000000000000001 },
      { key: '6ba348f', sortValue: 0.0000000000000000000000005 },
      { key: '9ba348f', sortValue: 0.0000000000000000000000006 }
    ]
    const itemToInsert = { key: '8ba3e8f', sortValue: 0.0000000000000000000000005 }
    const insertAtIndex = 3
    const expectedUpdtes = [
      { key: '8ba3e8f', sortValue: 0.0000000000000000000000005 },
      { key: '6ba348f', sortValue: 0.0000000000000000000000003 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })
})
