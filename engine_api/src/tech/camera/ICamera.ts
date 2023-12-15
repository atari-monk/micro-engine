import IVector2 from '../../math/vector/IImmutableVector2'
import IRendererV2 from '../renderer/IRendererV2'
import ITileMapDataFactory from '../tile_map/ITileMapDataFactory'

export default interface ICamera {
  set renderer(renderer: IRendererV2)
  load(tileMap: ITileMapDataFactory): void
  setPosition(position: IVector2): void
}
