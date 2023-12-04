import { ILogger, IObject } from 'engine_api'
import ObjectComponent from '../../browser/component/ObjectComponent'
import Entity from '../../tech/entity_component/Entity'
import MovementComponent from '../component/MovementComponent'

export default class PlayerEntity extends Entity {
  constructor(logger: ILogger, objectData: IObject) {
    super(logger)
    const object = new ObjectComponent(objectData)
    const movement = new MovementComponent(object)
    this.addComponent(object)
    this.addComponent(movement)
  }
}
