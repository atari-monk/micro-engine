import { MapManager } from 'engine'

describe('MapManager', () => {
  let mapManager: MapManager<string>

  beforeEach(() => {
    mapManager = new MapManager()
  })

  test('add should add an object to the map', () => {
    mapManager.add('item1', 'value1')
    expect(mapManager.count).toBe(1)
  })

  test('add should log an error if object with the same name already exists', () => {
    mapManager.add('item1', 'value1')
    const spyError = jest.spyOn(mapManager['_logger'], 'error')
    mapManager.add('item1', 'value2')
    expect(mapManager.count).toBe(1)
    expect(spyError).toHaveBeenCalledWith(
      "Object with name 'item1' already exists!"
    )
  })

  test('remove should remove an object from the map', () => {
    mapManager.add('item1', 'value1')
    mapManager.remove('item1')
    expect(mapManager.count).toBe(0)
  })

  test('removeAll should remove all objects from the map', () => {
    mapManager.add('item1', 'value1')
    mapManager.add('item2', 'value2')
    mapManager.removeAll()
    expect(mapManager.count).toBe(0)
  })

  test('get should return the object with the given name', () => {
    mapManager.add('item1', 'value1')
    const result = mapManager.get('item1')
    expect(result).toBe('value1')
  })

  test('get should log an error if the object with the given name is not found', () => {
    const spyError = jest.spyOn(mapManager['_logger'], 'error')
    const result = mapManager.get('item1')
    expect(result).toBeUndefined()
    expect(spyError).toHaveBeenCalledWith("Object with name 'item1' not found!")
  })

  test('getStrict should return the object with the given name', () => {
    mapManager.add('item1', 'value1')
    const result = mapManager.getStrict('item1')
    expect(result).toBe('value1')
  })

  test('getStrict should throw an error if the object with the given name is not found', () => {
    const spyError = jest.spyOn(mapManager['_logger'], 'error')
    expect(() => mapManager.getStrict('item1')).toThrow(
      "Object with name 'item1' not found!"
    )
    expect(spyError).toHaveBeenCalledWith("Object with name 'item1' not found!")
  })

  test('getWithStatus should return an object with found status', () => {
    mapManager.add('item1', 'value1')
    const result = mapManager.getWithStatus('item1')
    expect(result).toEqual({ found: true, object: 'value1' })
  })

  test('getWithStatus should log an error if the object with the given name is not found', () => {
    const spyError = jest.spyOn(mapManager['_logger'], 'error')
    const result = mapManager.getWithStatus('item1')
    expect(result).toEqual({ found: false, object: undefined })
    expect(spyError).toHaveBeenCalledWith("Object with name 'item1' not found!")
  })
})
