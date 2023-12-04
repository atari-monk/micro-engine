import { ILogger, IObject, IRendererV2 } from 'engine_api'
import ObjectComponent from '../component/ObjectComponent'
import Entity from '../../tech/entity_component/Entity'
import RenderComponent from '../component/RenderComponent'

export default class ObjectEntity extends Entity {
  constructor(logger: ILogger, objectData: IObject, renderer: IRendererV2) {
    super(logger)
    const object = new ObjectComponent(objectData)
    const render = new RenderComponent(object, renderer)
    this.addComponent(object)
    this.addComponent(render)
  }
}
