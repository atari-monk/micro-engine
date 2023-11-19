import ICollisionInfo from './ICollisionInfo'

export default interface ICollisionCallback {
  (collisionInfo: ICollisionInfo): void
}
