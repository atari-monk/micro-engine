import {
  IImmutableVector2,
  ITile,
  ITilemapDataFactory,
  IVector2,
} from 'engine_api'
import { ImmutableVector2 } from 'engine'

export default class TilemapDataFactory implements ITilemapDataFactory {
  private readonly _resolution = new ImmutableVector2(1920, 1080)
  private readonly _tileSize = new ImmutableVector2(20, 20)
  private readonly _mapOffset = new ImmutableVector2(0, 330)

  get mapOffset(): IImmutableVector2 {
    return this._mapOffset
  }

  createTiles(): ITile[] {
    return [
      {
        id: 1,
        size: this._tileSize,
        rgba: 'rgba(139, 69, 19, 1)',
        desc: 'Brown color for earth',
      },
      {
        id: 2,
        size: this._tileSize,
        rgba: 'rgba(0, 128, 0, 1)',
        desc: 'Green color for grass',
      },
      {
        id: 3,
        size: this._tileSize,
        rgba: 'rgba(135, 206, 250, 1)',
        desc: 'Light blue color for sky',
      },
    ]
  }

  private generateTable(
    tableSize: IImmutableVector2,
    tileId: number
  ): number[][] {
    const table: number[][] = []

    for (let i = 0; i < tableSize.y; i++) {
      const row: number[] = []
      for (let j = 0; j < tableSize.x; j++) {
        row.push(tileId)
      }
      table.push(row)
    }

    return table
  }

  fillRow(table: number[][], rowIndex: number, tileId: number) {
    if (rowIndex < 0 || rowIndex >= table.length) {
      console.error('Invalid rowIndex. Please provide a valid row index.')
      return table
    }
    for (let i = 0; i < table[rowIndex].length; i++) {
      table[rowIndex][i] = tileId
    }
    return table
  }

  createMap(): number[][] {
    const tableSize = this._resolution.divide(this._tileSize)
    const table = this.generateTable(tableSize, 3)
    this.fillRow(table, tableSize.y - 1, 1)
    this.fillRow(table, tableSize.y - 2, 1)
    this.fillRow(table, tableSize.y - 3, 2)
    return table
  }
}
