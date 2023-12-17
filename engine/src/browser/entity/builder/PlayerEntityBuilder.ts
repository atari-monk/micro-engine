import {
  IDataEntityBuilder,
  IInputManager,
  IObject,
  IRendererV2,
} from 'engine_api'
import ObjectComponent from '../../component/ObjectComponent'
import PlayerEntity from '../PlayerEntity'
import RenderComponent from '../../component/RenderComponent'
import MovementComponent from '../../component/MovementComponent'
import EntityBuilder from './EntityBuilder'
import { IPlayerEntityBuilder } from './EntityBuilderAPI'

export default class PlayerEntityBuilder
  extends EntityBuilder
  implements IDataEntityBuilder<PlayerEntity, IObject>, IPlayerEntityBuilder
{
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
    this.addMovementComponent(entity, objectComponent)

    return entity
  }

  protected addMovementComponent(
    entity: PlayerEntity,
    objectComponent: ObjectComponent
  ) {
    entity.addComponent(
      new MovementComponent(objectComponent!, this._input!, this._logger!)
    )
  }
}
