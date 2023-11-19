import ICollisionCallback from './ICollisionCallback'
import IGameObject from './IGameObject'

export default interface ICollisionDetector {
  checkCollision(object1: IGameObject, object2: IGameObject): void
  subscribeToCollisions(callback: ICollisionCallback): void
}
