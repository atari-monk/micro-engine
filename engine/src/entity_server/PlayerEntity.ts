import { IObject } from 'engine_api'
import ObjectComponent from '../component/ObjectComponent'
import Entity from '../entity_component/Entity'

export default class PlayerEntity extends Entity {
  constructor(objectData: IObject) {
    super()
    const object = new ObjectComponent(objectData)
    this.addComponent(object)
  }
}
