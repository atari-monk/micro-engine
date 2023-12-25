import { ImmutableVector2 } from 'engine'
import { runVectorTests } from './vector2_shared.test'

test('should subtract two vectors', () => {
  const v1 = new ImmutableVector2(5, 6)
  const v2 = new ImmutableVector2(2, 3)
  const result = v1.subtract(v2)
  expect(result).toEqual(new ImmutableVector2(3, 3))
  expect(v1.x).toEqual(5)
  expect(v1.y).toEqual(6)
  expect(v2.x).toEqual(2)
  expect(v2.y).toEqual(3)
})

describe('ImmutableVector2', () => {
  runVectorTests(ImmutableVector2)
})
