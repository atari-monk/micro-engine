import { CollisionDetector, Vector2 } from 'engine'
import { IGameObject, ICollisionInfo } from 'engine_api'

describe('CollisionDetector', () => {
  let collisionDetector: CollisionDetector
  let collisionCallback: jest.Mock

  beforeEach(() => {
    collisionDetector = new CollisionDetector()
    collisionCallback = jest.fn()
    collisionDetector.subscribeToCollisions(collisionCallback)
  })

  test('should detect collision and invoke callback', () => {
    const object1: IGameObject = {
      position: new Vector2(10, 10),
      size: new Vector2(20, 20),
    }
    const object2: IGameObject = {
      position: new Vector2(15, 15),
      size: new Vector2(20, 20),
    }

    collisionDetector.checkCollision(object1, object2)

    const expectedCollisionInfo: ICollisionInfo = { object1, object2 }
    expect(collisionCallback).toHaveBeenCalledWith(expectedCollisionInfo)
  })

  test('should not detect collision when objects do not collide', () => {
    const object1: IGameObject = {
      position: new Vector2(10, 10),
      size: new Vector2(20, 20),
    }
    const object2: IGameObject = {
      position: new Vector2(50, 50),
      size: new Vector2(20, 20),
    }

    collisionDetector.checkCollision(object1, object2)

    expect(collisionCallback).not.toHaveBeenCalled()
  })
})
