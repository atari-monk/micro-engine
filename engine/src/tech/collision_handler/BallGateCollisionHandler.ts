import { ICollisionHandler, ICollisionInfo, IEntityManager } from 'engine_api'

export default class BallGateCollisionHandler implements ICollisionHandler {
  constructor(private readonly _entityManager: IEntityManager) {}

  handleCollision(collisionInfo: ICollisionInfo) {
    console.log('BallGateCollisionHandler')
  }
}
