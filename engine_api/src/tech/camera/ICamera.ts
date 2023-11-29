import IVector2 from '../../math/vector/IImmutableVector2'
import ITilemapDataFactory from '../tile_map/ITilemapDataFactory'

export default interface ICamera {
  load(tileMap: ITilemapDataFactory): void
  setPosition(position: IVector2): void
}
