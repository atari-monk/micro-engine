import { ILogger, IObject } from 'engine_api'
import ObjectComponent from '../../browser/component/ObjectComponent'
import Entity from '../../tech/entity_component/Entity'

export default class ObjectEntity extends Entity {
  constructor(logger: ILogger, objectData: IObject) {
    super(logger)
    const object = new ObjectComponent(objectData)
    this.addComponent(object)
  }
}