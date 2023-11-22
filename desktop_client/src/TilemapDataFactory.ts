import { ITile, ITilemapDataFactory } from 'engine_api'
import { Vector2 } from 'engine'

export default class TilemapDataFactory implements ITilemapDataFactory {
  createTiles(): ITile[] {
    const tileSize = new Vector2(120, 120)
    return [
      {
        id: 1,
        size: tileSize,
        rgba: 'rgba(139, 69, 19, 1)', // Brown color for earth
      },
      {
        id: 2,
        size: tileSize,
        rgba: 'rgba(0, 128, 0, 1)', // Green color for grass
      },
      {
        id: 3,
        size: tileSize,
        rgba: 'rgba(135, 206, 250, 1)', // Light blue color for sky
      },
    ]
  }

  // prettier-ignore
  createMap(): number[][] {
    return [
      //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ]
      //[ 3, 3, 3, 3, 3, 3, 3, 3, 3, 30, 30, 30, 30, 30, 30, 30 ]
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //1
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //2
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //3
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //4
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], //5
      [3, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3], //6
      [3, 3, 3, 3, 3, 3, 3, 2, 1, 2, 3, 3, 3, 3, 3, 3], //7
      [2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2], //8
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //9
    ]
  }
}
