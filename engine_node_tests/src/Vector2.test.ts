import { Vector2 } from 'engine'
import { runVectorTests } from './vector2_shared.test'

describe('Vector2.getNew', () => {
  it('should return a new instance with the same values', () => {
    const inputVector = new Vector2(1, 2)

    const result = Vector2.getNew(inputVector)
    inputVector.x = 10
    inputVector.y = 10

    expect(result).toBeInstanceOf(Vector2)
    expect(result.x).toBe(inputVector.x)
    expect(result.y).toBe(inputVector.y)
    expect(result.x).toBe(1)
    expect(result.y).toBe(2)
    expect(inputVector.x).toBe(10)
    expect(inputVector.y).toBe(10)
  })
})

describe('Vector2', () => {
  runVectorTests(Vector2)
})
