import EntityBuilder from './EntityBuilder'
import ObjectComponent from '../component/ObjectComponent'
import PlayerEntity from './PlayerEntity'
import RenderComponent from '../component/RenderComponent'
import MovementComponent from '../component/MovementComponent'

export default class PlayerEntityBuilder extends EntityBuilder<PlayerEntity> {
  buildComponents() {
    const object = new ObjectComponent(this.objectData)
    const render = new RenderComponent(object, this.renderer)
    const move = new MovementComponent(object, this.input, this.logger)

    this.entity.addComponent(object)
    this.entity.addComponent(render)
    this.entity.addComponent(move)
  }
}
