import { IObject } from '../../browser'
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
}
