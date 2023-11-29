import { IObject } from 'engine_api'
import ObjectComponent from '../../browser_engine/component/ObjectComponent'
import Entity from '../../engine_tech/entity_component/Entity'

export default class ObjectEntity extends Entity {
  constructor(objectData: IObject) {
    super()
    const object = new ObjectComponent(objectData)
    this.addComponent(object)
  }
}
