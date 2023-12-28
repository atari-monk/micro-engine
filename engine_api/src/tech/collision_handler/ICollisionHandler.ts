import ICollisionInfo from '../collision_detector/ICollisionInfo'

export default interface ICollisionHandler {
  handleCollision(collisionInfo: ICollisionInfo): void
}
