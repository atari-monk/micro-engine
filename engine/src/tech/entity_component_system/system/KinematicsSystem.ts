import { IEntity, IEntityManager, IEventSystem } from 'engine_api'
import LogicSystemBase from './logic/LogicSystemBase'
import ObjectComponent from '../../component/ObjectComponent'
import Vector2 from '../../../math/vector/Vector2'
import { KinematicsComponent } from '../../component/KinematicsComponent'

export default class KinematicsSystem extends LogicSystemBase {
  constructor(
    entityManager: IEntityManager,
    private readonly _eventSystem: IEventSystem
  ) {
    super(entityManager)
  }

  updateLogic(deltaTime: number, entity: IEntity): void {
    const objectComponent = entity.getComponentByType(ObjectComponent)
    const kinematicsComponent = entity.getComponentByType(KinematicsComponent)

    objectComponent.position.add(
      Vector2.getNew(objectComponent.velocity).multiply(deltaTime)
    )

    if (kinematicsComponent.frictionCoefficient > 0) {
      objectComponent.velocity.multiply(
        Math.pow(kinematicsComponent.frictionCoefficient, deltaTime)
      )
    }

    if (
      kinematicsComponent.stopThreshold > 0 &&
      objectComponent.velocity.length() < kinematicsComponent.stopThreshold
    ) {
      if (
        objectComponent.velocity.x !== 0 ||
        objectComponent.velocity.y !== 0
      ) {
        objectComponent.velocity.x = 0
        objectComponent.velocity.y = 0
        this._eventSystem.publish('entityStopped', objectComponent.id)
      }
    }
  }
}
