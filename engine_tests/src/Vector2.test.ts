import { Vector2 } from 'engine_api'

describe('Vector2', () => {
  it('should add two vectors', () => {
    const v1 = new Vector2(1, 2)
    const v2 = new Vector2(3, 4)
    const result = v1.add(v2)

    expect(result).toEqual(new Vector2(4, 6))
  })

  it('should subtract two vectors', () => {
    const v1 = new Vector2(5, 6)
    const v2 = new Vector2(2, 3)
    const result = v1.subtract(v2)

    expect(result).toEqual(new Vector2(3, 3))
  })

  it('should multiply vector by scalar', () => {
    const v = new Vector2(2, 3)
    const scalar = 2
    const result = v.multiply(scalar)

    expect(result).toEqual(new Vector2(4, 6))
  })

  it('should calculate dot product of two vectors', () => {
    const v1 = new Vector2(2, 3)
    const v2 = new Vector2(4, 5)
    const result = v1.dot(v2)

    expect(result).toEqual(2 * 4 + 3 * 5)
  })

  it('should calculate the length of the vector', () => {
    const v = new Vector2(3, 4)
    const result = v.length()

    expect(result).toEqual(5)
  })

  it('should calculate the squared length of the vector', () => {
    const v = new Vector2(3, 4)
    const result = v.squaredLength()

    expect(result).toEqual(3 * 3 + 4 * 4)
  })

  it('should normalize the vector', () => {
    const v = new Vector2(3, 4)
    const result = v.normalize()

    const expectedLength = v.length()
    const expected = expectedLength
      ? new Vector2(3 / expectedLength, 4 / expectedLength)
      : new Vector2(0, 0)

    expect(result).toEqual(expected)
  })

  it('should handle zero vector normalization', () => {
    const zeroVector = new Vector2(0, 0)
    const result = zeroVector.normalize()

    expect(result).toEqual(new Vector2(0, 0))
  })
})
