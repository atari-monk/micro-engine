import { ICollisionCallback, ICollisionDetector, IObject } from 'engine_api'

export default class CollisionManager {
  private collisionDetector: ICollisionDetector

  constructor(collisionDetector: ICollisionDetector) {
    this.collisionDetector = collisionDetector
  }

  setCollisionDetector(collisionDetector: ICollisionDetector) {
    this.collisionDetector = collisionDetector
  }

  getCollisionDetector(): ICollisionDetector {
    return this.collisionDetector
  }

  checkCollision(object1: IObject, object2: IObject): void {
    this.collisionDetector.checkCollision(object1, object2)
  }

  subscribeToCollisions(
    object1: IObject,
    object2: IObject,
    callback: ICollisionCallback
  ): void {
    this.collisionDetector.subscribeToCollisions(object1, object2, callback)
  }
}
