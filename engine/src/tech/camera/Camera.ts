import { ICamera, IRendererV2, ITileMapDataFactory, IVector2 } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'

export default class Camera implements ICamera {
  private _center0: IVector2 = new Vector2()
  private _center: IVector2 = new Vector2()
  private _delta: IVector2 = new Vector2()
  private _tileMap!: ITileMapDataFactory
  private _renderer!: IRendererV2

  set renderer(renderer: IRendererV2) {
    this._renderer = renderer
  }

  load(tileMap: ITileMapDataFactory) {
    this._tileMap = tileMap
    if (!this._tileMap) throw new Error('tile map must be set in Camera !')
    if (!this._renderer) throw new Error('renderer must be set in Camera !')
    this._center0.convert(this._renderer.getCenter())
  }

  setPosition(position: IVector2): void {
    this._center.x = this._center0.x
    this._center.y = this._center0.y
    this._delta = this._center
      .subtract(position)
      .add(
        new Vector2(
          this._tileMap.mapOffset.x ?? 0,
          this._tileMap.mapOffset.y ?? 0
        )
      )
    this._renderer.translate(this._delta)
  }
}
