// Always run from the compiled version which is the one published
import sortUpdates from '../lib/sort-updates'

describe('sort-updates', () => {
  it('can insert on empty list', () => {
    const list = []
    const itemToInsert = { id: '6ba3e8f', sortValue: undefined }
    const insertAtIndex = 0

    const expectedUpdtes = [
      { id: '6ba3e8f', sortValue: 0 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert at the top of the list on a list with a single item', () => {
    const list = [
      { id: 'aba348f', sortValue: 0 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 0

    const expectedUpdtes = [
      { id: '8ba3e8f', sortValue: -1 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert at the end of the list', () => {
    const list = [
      { id: 'aba348f', sortValue: 0 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 1

    const expectedUpdtes = [
      { id: '8ba3e8f', sortValue: 1 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have space', () => {
    const list = [
      { id: 'aba348f', sortValue: 0 },
      { id: '5ba348f', sortValue: 5 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 1

    const expectedUpdtes = [
      { id: '8ba3e8f', sortValue: 3 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert at the end', () => {
    const list = [
      { id: 'aba348f', sortValue: 0 },
      { id: '5ba348f', sortValue: 5 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 2

    const expectedUpdtes = [
      { id: '8ba3e8f', sortValue: 6 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have no space and end at the beggining', () => {
    const list = [
      { id: 'aba348f', sortValue: 0 },
      { id: '5ba348f', sortValue: 0.0000000000000000000000001 },
      { id: '6ba348f', sortValue: 0.0000000000000000000000002 },
      { id: '9ba348f', sortValue: 0.0000000000000000000000003 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 3
    const expectedUpdtes = [
      { id: '8ba3e8f', sortValue: 0.0000000000000000000000002 },
      { id: '6ba348f', sortValue: 0.0000000000000000000000001 },
      { id: '5ba348f', sortValue: 0 },
      { id: 'aba348f', sortValue: -1 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have no space when there are 2 items', () => {
    const list = [
      { id: 'aba348f', sortValue: 0 },
      { id: '5ba348f', sortValue: 0.0000000000000000000000001 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortValue: undefined }
    const insertAtIndex = 1
    const expectedUpdtes = [
      { id: '8ba3e8f', sortValue: 0 },
      { id: 'aba348f', sortValue: -1 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })

  it('can insert between 2 items that have no space and end somewhere that is not the end', () => {
    const list = [
      { id: 'aba348f', sortValue: 0 },
      { id: '5ba348f', sortValue: 0.0000000000000000000000001 },
      { id: '6ba348f', sortValue: 0.0000000000000000000000005 },
      { id: '9ba348f', sortValue: 0.0000000000000000000000006 }
    ]
    const itemToInsert = { id: '8ba3e8f', sortValue: 0.0000000000000000000000005 }
    const insertAtIndex = 3
    const expectedUpdtes = [
      { id: '8ba3e8f', sortValue: 0.0000000000000000000000005 },
      { id: '6ba348f', sortValue: 0.0000000000000000000000003 }
    ]

    let updates = sortUpdates(insertAtIndex, itemToInsert, list)
    expect(updates).toEqual(expectedUpdtes)
  })
})
