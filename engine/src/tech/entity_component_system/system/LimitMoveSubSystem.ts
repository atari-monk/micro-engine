import { IEntity } from 'engine_api'
import ObjectComponent from '../../component/ObjectComponent'
import ICollisionSubSystem from './ICollisionSubSystem'
import LimitMoveComponent from '../../component/LimitMoveComponent'

export default class LimitMoveSubSystem implements ICollisionSubSystem {
  updateLogic(deltaTime: number, entity: IEntity) {
    const objectComponent = entity.getComponentByTypeStrict(ObjectComponent)
    const limitMoveComponent =
      entity.getComponentByTypeStrict(LimitMoveComponent)

    const halfWidth = objectComponent.size.x / 2
    const halfHeight = objectComponent.size.y / 2

    const newX = Math.max(
      halfWidth,
      Math.min(
        limitMoveComponent.limitSize.x - halfWidth,
        objectComponent.position.x
      )
    )
    const newY = Math.max(
      halfHeight,
      Math.min(
        limitMoveComponent.limitSize.y - halfHeight,
        objectComponent.position.y
      )
    )

    objectComponent.position.x = newX
    objectComponent.position.y = newY
  }
}
