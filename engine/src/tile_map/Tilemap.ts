import {
  IRenderable,
  IRendererV2,
  ITile,
  ITilemapDataFactory,
  IVector2,
} from 'engine_api'
import Vector2 from '../math/Vector2'

export default class Tilemap implements IRenderable {
  private map: number[][]
  private tiles: ITile[]
  private _cords: IVector2
  private _zeroTile: ITile

  constructor(private readonly _renderer: IRendererV2) {
    this.map = []
    this.tiles = []
    this._cords = new Vector2()
    this._zeroTile = {
      id: 0,
      size: new Vector2(0, 0),
      rgba: 'rgba(0, 0, 0, 0)',
    }
  }

  load(mapFactory: ITilemapDataFactory) {
    this.map = mapFactory.createMap()
    this.tiles = mapFactory.createTiles()
  }

  render(dt: number): void {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        const tileId = this.map[y][x]
        const tile = this.getTileById(tileId)
        this._cords.x = x * tile.size.x
        this._cords.y = y * tile.size.y
        if (tile) {
          this.renderTile(tile)
        }
      }
    }
  }

  private getTileById(id: number): ITile {
    const tile = this.tiles.find((tile) => tile.id === id)
    if (!tile) return this._zeroTile
    return tile
  }

  private renderTile(tile: ITile): void {
    this._renderer.drawRect(this._cords, tile.size, tile.rgba)
  }
}
