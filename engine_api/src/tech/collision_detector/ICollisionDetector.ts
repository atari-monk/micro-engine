import IObject from '../data_model/IObject'
import ICollisionCallback from './ICollisionCallback'

export default interface ICollisionDetector {
  checkCollision(object1: IObject, object2: IObject): void
  subscribeToCollisions(
    object1: IObject,
    object2: IObject,
    callback: ICollisionCallback
  ): void
}
