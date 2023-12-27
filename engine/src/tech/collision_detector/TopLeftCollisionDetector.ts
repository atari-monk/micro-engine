import { ICollisionCallback, ICollisionDetector, IObject } from 'engine_api'

export default class TopLeftCollisionDetector implements ICollisionDetector {
  private collisionCallbacks: ICollisionCallback[] = []

  checkCollision(object1: IObject, object2: IObject): void {
    if (!object1 || !object2) return

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
