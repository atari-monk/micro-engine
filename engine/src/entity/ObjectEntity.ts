import { IObjectEntityConfig } from 'engine_api'
import ObjectComponent from '../component/ObjectComponent'
import Entity from '../entity_component/Entity'
import RenderComponent from '../component/RenderComponent'
import MovementComponent from '../component/MovementComponent'

export default class ObjectEntity extends Entity {
  constructor(config: IObjectEntityConfig) {
    super()
    const object = new ObjectComponent(config.objectConfig)
    const render = new RenderComponent(object, config.renderer)
    const move = new MovementComponent(object, config.input, config.logger)
    this.addComponent(object)
    this.addComponent(render)
    this.addComponent(move)
  }
}
