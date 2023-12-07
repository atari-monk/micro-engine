import { IObject } from '../../browser'
import IInputManager from '../input_manager/IInputManager'
import ILogger from '../log_manager/ILogger'
import IRendererV2 from '../renderer/IRendererV2'
import IAnimationConfig from '../sprite/IAnimationConfig'
import ITilemap from '../tile_map/ITilemap'

export default interface IEntityDependencyListBuilder {
  setLogger(logger: ILogger): this
  setTileMap(tileMap: ITilemap): this
  setObjectData(objectData: IObject): this
  setRenderer(renderer: IRendererV2): this
  setAnimationConfig(animConfig: IAnimationConfig[]): this
  setInput(input: IInputManager): this

  get logger(): ILogger
  get tileMap(): ITilemap
  get objectData(): IObject
  get renderer(): IRendererV2
  get animConfig(): IAnimationConfig[]
  get input(): IInputManager
}
