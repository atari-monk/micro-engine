import { IInputManager, IObject, IRendererV2 } from 'engine_api'
import ObjectComponent from '../../browser/component/ObjectComponent'
import Entity from '../../tech/entity_component/Entity'
import RenderComponent from '../../browser/component/RenderComponent'
import MovementComponent from '../component/MovementComponent'

export default class PlayerEntity extends Entity {
  constructor(
    objectData: IObject,
    renderer: IRendererV2,
    input: IInputManager  ) {
    super()
    const object = new ObjectComponent(objectData)
    const render = new RenderComponent(object, renderer)
    const move = new MovementComponent(input)
    this.addComponent(object)
    this.addComponent(render)
    this.addComponent(move)
  }
}
