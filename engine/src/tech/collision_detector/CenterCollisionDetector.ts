import { ICollisionCallback, ICollisionDetector, IObject } from 'engine_api'

export default class CenterCollisionDetector implements ICollisionDetector {
  private collisionCallbacks: ICollisionCallback[] = []

  checkCollision(object1: IObject, object2: IObject): void {
    if (!object1 || !object2) return

    const halfWidth1 = object1.size.x / 2
    const halfHeight1 = object1.size.y / 2
    const halfWidth2 = object2.size.x / 2
    const halfHeight2 = object2.size.y / 2

    const isColliding =
      object1.position.x - halfWidth1 < object2.position.x + halfWidth2 &&
      object1.position.x + halfWidth1 > object2.position.x - halfWidth2 &&
      object1.position.y - halfHeight1 < object2.position.y + halfHeight2 &&
      object1.position.y + halfHeight1 > object2.position.y - halfHeight2

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
