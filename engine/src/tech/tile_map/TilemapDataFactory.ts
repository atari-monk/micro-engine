import { IImmutableVector2, ITile, ITileMapDataFactory } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'
import ImmutableVector2 from '../../math/vector/ImmutableVector2'

export default class TilemapDataFactory implements ITileMapDataFactory {
  private readonly _mapOffset = new ImmutableVector2(0, 150)

  get mapOffset(): IImmutableVector2 {
    return this._mapOffset
  }

  createTiles(): ITile[] {
    const tileSize = new Vector2(120, 120)
    return [
      {
        id: 1,
        size: tileSize,
        rgba: 'rgba(139, 69, 19, 1)',
        desc: 'Brown color for earth',
      },
      {
        id: 2,
        size: tileSize,
        rgba: 'rgba(0, 128, 0, 1)',
        desc: 'Green color for grass',
      },
      {
        id: 3,
        size: tileSize,
        rgba: 'rgba(135, 206, 250, 1)',
        desc: 'Light blue color for sky',
      },
    ]
  }

  // prettier-ignore
  createMap(): number[][] {
    return [
    //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6 ]
      [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],//1
      [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],//2
      [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],//3
      [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],//4
      [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],//5
      [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],//6
      [ 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 ],//7
      [ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],//8
      [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ],//9
    ]
  }
}
