import { RandomNumberGenerator } from 'engine'
import { IRandomNumberGenerator } from 'engine_api'

describe('RandomNumberGenerator', () => {
  let rng: IRandomNumberGenerator

  beforeEach(() => {
    rng = new RandomNumberGenerator()
  })

  test('getRandomInt should generate a random integer within the specified range', () => {
    const result = rng.getRandomInt(1, 10)
    expect(result).toBeGreaterThanOrEqual(1)
    expect(result).toBeLessThanOrEqual(10)
    expect(result % 1).toBe(0) // Ensure it's an integer
  })

  test('getRandomFloat should generate a random float within the specified range', () => {
    const result = rng.getRandomFloat(0.5, 1.5)
    expect(result).toBeGreaterThanOrEqual(0.5)
    expect(result).toBeLessThanOrEqual(1.5)
  })

  test('getRandomBoolean should generate a random boolean value', () => {
    const result = rng.getRandomBoolean()
    expect(typeof result).toBe('boolean')
  })

  test('getRandomArrayElement should pick a random element from the array', () => {
    const fruits = ['Apple', 'Banana', 'Orange', 'Grapes']
    const result = rng.getRandomArrayElement(fruits)
    expect(fruits).toContain(result)
  })
})
