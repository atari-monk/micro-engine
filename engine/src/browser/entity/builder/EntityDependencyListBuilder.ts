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
  private _logger!: ILogger
  private _tileMap!: ITilemap
  private _objectData!: IObject
  private _renderer!: IRendererV2
  private _animConfig!: IAnimationConfig[]
  private _input!: IInputManager

  setLogger(logger: ILogger): this {
    this._logger = logger
    return this
  }

  setTileMap(tileMap: ITilemap): this {
    this._tileMap = tileMap
    return this
  }

  setObjectData(objectData: IObject): this {
    this._objectData = objectData
    return this
  }

  setRenderer(renderer: IRendererV2): this {
    this._renderer = renderer
    return this
  }

  setAnimationConfig(animConfig: IAnimationConfig[]): this {
    this._animConfig = animConfig
    return this
  }

  setInput(input: IInputManager): this {
    this._input = input
    return this
  }

  get logger(): ILogger {
    return this._logger
  }

  get tileMap(): ITilemap {
    return this._tileMap
  }

  get objectData(): IObject {
    return this._objectData
  }

  get renderer(): IRendererV2 {
    return this._renderer
  }

  get animConfig(): IAnimationConfig[] {
    return this._animConfig
  }

  get input(): IInputManager {
    return this._input
  }
}
