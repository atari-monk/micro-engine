import { IPlayerEntityConfig } from 'engine_api'
import ObjectComponent from '../component/ObjectComponent'
import Entity from '../entity_component/Entity'
import RenderComponent from '../component/RenderComponent'
import ClientMovementComponent from '../component/ClientMovementComponent'

export default class ClientPlayerEntity extends Entity {
  constructor(config: IPlayerEntityConfig) {
    super()
    const object = new ObjectComponent(config.objectConfig)
    const render = new RenderComponent(object, config.renderer)
    const move = new ClientMovementComponent(
      object,
      config.input,
      config.logger
    )
    this.addComponent(object)
    this.addComponent(render)
    this.addComponent(move)
  }
}
