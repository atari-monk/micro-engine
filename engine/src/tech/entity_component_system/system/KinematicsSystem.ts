import { IEntity, IEntityManager, IEventSystem } from 'engine_api'
import LogicSystemBase from './logic/LogicSystemBase'
import ObjectComponent from '../../component/ObjectComponent'
import Vector2 from '../../../math/vector/Vector2'
import { KinematicsComponent } from '../../component/KinematicsComponent'
import IdleState from '../../state_machine/IdleState'
import { EventNames } from '../../event_system/EventNames'

export default class KinematicsSystem extends LogicSystemBase {
  constructor(
    entityManager: IEntityManager,
    private readonly _eventSystem: IEventSystem
  ) {
    super(entityManager)
  }

  updateLogic(deltaTime: number, entity: IEntity): void {
    const objectComponent = entity.getComponentByTypeStrict(ObjectComponent)
    const kinematicsComponent =
      entity.getComponentByTypeStrict(KinematicsComponent)

    if (objectComponent.moveStep.x === 0 && objectComponent.moveStep.y === 0) {
      objectComponent.position.add(
        Vector2.getNew(objectComponent.velocity).multiply(deltaTime)
      )
    } else {
      objectComponent.position.add(Vector2.getNew(objectComponent.velocity))
    }

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
        this.sendEvent(objectComponent)
      }
    }
  }

  private sendEvent(objectComponent: ObjectComponent) {
    this._eventSystem.publish(EventNames.ChangeState, {
      id: objectComponent.id,
      newState: new IdleState(this._eventSystem),
    })
  }
}
