import { PositionComponent, Vector2 } from 'engine'

describe('PositionComponent tests', () => {
  test('PositionComponent initializes with the correct position', () => {
    const initialPosition = new Vector2(10, 20)
    const positionComponent = new PositionComponent(initialPosition)

    expect(positionComponent.position).toEqual(initialPosition)
  })

  test('PositionComponent can set and get the position', () => {
    const positionComponent = new PositionComponent()
    const newPosition = new Vector2(30, 40)

    positionComponent.position = newPosition

    expect(positionComponent.position).toEqual(newPosition)
  })
})
