import { IRenderable, ITile } from 'engine_api'

export default class Tilemap implements IRenderable {
  private map: number[][]
  private tiles: ITile[]

  constructor(map: number[][], tiles: ITile[]) {
    this.map = map
    this.tiles = tiles
  }

  render(context: CanvasRenderingContext2D, tileSize: number): void {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        const tileId = this.map[y][x]
        const tile = this.getTileById(tileId)

        if (tile) {
          this.renderTile(context, tile, x * tileSize, y * tileSize, tileSize)
        }
      }
    }
  }

  private getTileById(id: number): ITile | undefined {
    return this.tiles.find((tile) => tile.id === id)
  }

  private renderTile(
    context: CanvasRenderingContext2D,
    tile: ITile,
    x: number,
    y: number,
    size: number
  ): void {
    context.fillStyle = `rgb(${tile.id * 10}, ${tile.id * 20}, ${tile.id * 30})`
    context.fillRect(x, y, size, size)
  }
}
