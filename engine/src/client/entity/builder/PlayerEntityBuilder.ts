import { IInputManager, IObject, IRendererV2 } from 'engine_api'
import EntityBuilder from '../../../browser/entity/builder/EntityBuilder'
import PlayerEntity from '../../../browser/entity/PlayerEntity'
import ObjectComponent from '../../../browser/component/ObjectComponent'
import RenderComponent from '../../../browser/component/RenderComponent'
import MovementComponent from '../../component/MovementComponent'

export default class PlayerEntityBuilder extends EntityBuilder {
  protected _renderer?: IRendererV2
  protected _input?: IInputManager

  withRenderer(renderer: IRendererV2): this {
    this._renderer = renderer
    return this
  }

  withInputManager(input: IInputManager): this {
    this._input = input
    return this
  }

  build(objectData: IObject): PlayerEntity {
    if (!this._logger) throw new Error('Logger not set!')
    if (!this._renderer) throw new Error('Renderer not set!')
    if (!this._input) throw new Error('InputManager not set!')
    if (!objectData) throw new Error('ObjectData not set!')

    const entity = new PlayerEntity()
    entity.logger = this._logger
    const objectComponent = new ObjectComponent(objectData)
    entity.addComponent(objectComponent)
    entity.addComponent(new RenderComponent(objectComponent, this._renderer))
    entity.addComponent(new MovementComponent(this._input))

    return entity
  }
}
