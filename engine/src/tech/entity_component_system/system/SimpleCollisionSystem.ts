import { IEntity, IEntityManager } from 'engine_api'
import LogicSystemBase from './logic/LogicSystemBase'
import { ICollisionSubSystem } from './ICollisionSubSystem'

export default class SimpleCollisionSystem extends LogicSystemBase {
  constructor(
    entityManager: IEntityManager,
    private readonly _collisionSubSystem: ICollisionSubSystem
  ) {
    super(entityManager)
  }

  updateLogic(deltaTime: number, entity: IEntity) {
    this._collisionSubSystem.updateLogic(deltaTime, entity)
  }
}
