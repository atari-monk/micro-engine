import { IInputManager, ILogger, IObject, IRendererV2 } from 'engine_api'
import ObjectComponent from '../../browser_engine/component/ObjectComponent'
import Entity from '../../engine_tech/entity_component/Entity'
import RenderComponent from '../../browser_engine/component/RenderComponent'
import MovementComponent from '../component/MovementComponent'

export default class PlayerEntity extends Entity {
  constructor(
    objectData: IObject,
    renderer: IRendererV2,
    input: IInputManager,
    logger: ILogger
  ) {
    super()
    const object = new ObjectComponent(objectData)
    const render = new RenderComponent(object, renderer)
    const move = new MovementComponent(object, input, logger)
    this.addComponent(object)
    this.addComponent(render)
    this.addComponent(move)
  }
}
