import {
  IAnimationConfig,
  IEntityDependencyListBuilder,
  IInputManager,
  ILogger,
  IObject,
  IRendererV2,
  ITilemap,
} from 'engine_api'

export class EntityDependencyListBuilder
  implements IEntityDependencyListBuilder
{
  protected logger!: ILogger
  protected tileMap!: ITilemap
  protected objectData!: IObject
  protected renderer!: IRendererV2
  protected animConfig?: IAnimationConfig[]
  protected input!: IInputManager

  setLogger(logger: ILogger): this {
    this.logger = logger
    return this
  }

  setTileMap(tileMap: ITilemap): this {
    this.tileMap = tileMap
    return this
  }

  setObjectData(objectData: IObject): this {
    this.objectData = objectData
    return this
  }

  setRenderer(renderer: IRendererV2): this {
    this.renderer = renderer
    return this
  }

  setAnimationConfig(animConfig: IAnimationConfig[]): this {
    this.animConfig = animConfig
    return this
  }

  setInput(input: IInputManager): this {
    this.input = input
    return this
  }
}
