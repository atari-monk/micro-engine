import IObject from '../data/IObject'
import ICollisionCallback from './ICollisionCallback'

export default interface ICollisionDetector {
  checkCollision(object1: IObject, object2: IObject): void
  subscribeToCollisions(callback: ICollisionCallback): void
}
