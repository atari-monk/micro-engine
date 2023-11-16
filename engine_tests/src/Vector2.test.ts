import { Vector2 } from 'engine'

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
    const length = v.length()
    const result = v.normalize()

    const tolerance = 1e-8

    const expected = length
      ? new Vector2(3 / length, 4 / length)
      : new Vector2(0, 0)

    expect(result.x).toBeCloseTo(expected.x, tolerance)
    expect(result.y).toBeCloseTo(expected.y, tolerance)
  })

  it('should handle zero vector normalization', () => {
    const zeroVector = new Vector2(0, 0)
    const result = zeroVector.normalize()

    expect(result).toEqual(new Vector2(0, 0))
  })

  it('should chain multiple operations', () => {
    const result = new Vector2(1, 2)
      .add(new Vector2(3, 4))
      .multiply(2)
      .subtract(new Vector2(1, 1))

    expect(result).toEqual(new Vector2(7, 11))
  })

  it('should destructure the result of an operation', () => {
    const { x, y } = new Vector2(2, 4).multiply(1.5)

    expect(x).toBeCloseTo(3)
    expect(y).toBeCloseTo(6)
  })

  it('should chain and destructure in one statement', () => {
    const { x, y } = new Vector2(1, 2)
      .add(new Vector2(3, 4))
      .multiply(2)
      .subtract(new Vector2(1, 1))

    expect(x).toEqual(7)
    expect(y).toEqual(11)
  })
})
