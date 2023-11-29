import { ICollisionCallback, ICollisionDetector, IGameObject } from 'engine_api'

export default class CollisionDetector implements ICollisionDetector {
  private collisionCallbacks: ICollisionCallback[] = []

  checkCollision(object1: IGameObject, object2: IGameObject): void {
    const isColliding =
      object1.position.x < object2.position.x + object2.size.x &&
      object1.position.x + object1.size.x > object2.position.x &&
      object1.position.y < object2.position.y + object2.size.y &&
      object1.position.y + object1.size.y > object2.position.y

    if (isColliding) {
      this.collisionCallbacks.forEach((callback) =>
        callback({ object1, object2 })
      )
    }
  }

  subscribeToCollisions(callback: ICollisionCallback): void {
    this.collisionCallbacks.push(callback)
  }
}
