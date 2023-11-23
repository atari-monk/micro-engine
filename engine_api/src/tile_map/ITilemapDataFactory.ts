import IImmutableVector2 from '../math/IImmutableVector2'
import ITile from './ITile'

export default interface ITilemapDataFactory {
  createTiles(): ITile[]
  createMap(): number[][]
  mapOffset: IImmutableVector2
}
