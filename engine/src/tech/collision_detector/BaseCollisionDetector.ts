import { ICollisionCallback, ICollisionDetector, IObject } from 'engine_api'

export default abstract class BaseCollisionDetector
  implements ICollisionDetector
{
  protected collisionCallbacks: Map<string, ICollisionCallback> = new Map()

  protected abstract collisionAlgorithm(
    object1: IObject,
    object2: IObject
  ): boolean

  checkCollision(object1: IObject, object2: IObject): void {
    const isColliding = this.collisionAlgorithm(object1, object2)

    if (isColliding) {
      const key = this.getCollisionKey(object1, object2)
      const callback = this.collisionCallbacks.get(key)
      if (callback) {
        callback({ object1, object2 })
      }
    }
  }

  protected getCollisionKey(object1: IObject, object2: IObject): string {
    return `${object1.id}_${object2.id}`
  }

  subscribeToCollisions(
    object1: IObject,
    object2: IObject,
    callback: ICollisionCallback
  ): void {
    const key = this.getCollisionKey(object1, object2)
    this.collisionCallbacks.set(key, callback)
  }
}
