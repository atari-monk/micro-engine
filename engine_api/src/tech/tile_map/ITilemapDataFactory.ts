import IImmutableVector2 from '../../math/vector/IImmutableVector2'
import ITile from './ITile'

export default interface ITileMapDataFactory {
  createTiles(): ITile[]
  createMap(): number[][]
  mapOffset: IImmutableVector2
}
