import { IObjectConfig, IRendererV2 } from 'engine_api'
import ObjectComponent from '../component/ObjectComponent'
import Entity from '../entity_component/Entity'
import RenderComponent from '../component/RenderComponent'

export default class ObjectEntity extends Entity {
  constructor(objectConfig: IObjectConfig, renderer: IRendererV2) {
    super()
    const object = new ObjectComponent(objectConfig)
    const render = new RenderComponent(object, renderer)
    this.addComponent(object)
    this.addComponent(render)
  }
}
