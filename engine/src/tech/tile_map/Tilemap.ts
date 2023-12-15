import {
  IRendererV2,
  ITile,
  ITileMap,
  ITileMapDataFactory,
  IVector2,
} from 'engine_api'
import Vector2 from '../../math/vector/Vector2'

export default class Tilemap implements ITileMap {
  private map: number[][]
  private tiles: ITile[]
  private _tilePositions: IVector2[][]
  private _zeroTile: ITile
  private _renderer!: IRendererV2

  set renderer(renderer: IRendererV2) {
    this._renderer = renderer
  }

  constructor() {
    this.map = []
    this.tiles = []
    this._tilePositions = []
    this._zeroTile = {
      id: 0,
      size: new Vector2(0, 0),
      rgba: 'rgba(0, 0, 0, 0)',
      desc: 'default zero tile',
    }
  }

  load(mapFactory: ITileMapDataFactory) {
    this.map = mapFactory.createMap()
    this.tiles = mapFactory.createTiles()

    this._tilePositions = this.map.map((row, y) =>
      row.map(
        (_, x) =>
          new Vector2(x * this.tiles[0].size.x, y * this.tiles[0].size.y)
      )
    )
    if (!this._renderer) throw new Error('renderer must be set in TileMap !')
  }

  render(dt: number): void {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        const tileId = this.map[y][x]
        const tile = this.getTileById(tileId)
        const position = this._tilePositions[y][x]
        if (tile) {
          this.renderTile(tile, position)
        }
      }
    }
  }

  private getTileById(id: number): ITile {
    const tile = this.tiles.find((tile) => tile.id === id)
    if (!tile) return this._zeroTile
    return tile
  }

  private renderTile(tile: ITile, position: IVector2): void {
    this._renderer.drawRect(position, tile.size, tile.rgba)
  }
}
