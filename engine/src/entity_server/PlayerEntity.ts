import { IObject } from 'engine_api'
import ObjectComponent from '../component/ObjectComponent'
import Entity from '../entity_component/Entity'
import MovementComponent from '../component_server/MovementComponent'

export default class PlayerEntity extends Entity {
  constructor(objectData: IObject) {
    super()
    const object = new ObjectComponent(objectData)
    const movement = new MovementComponent(object)
    this.addComponent(object)
    this.addComponent(movement)
  }
}
