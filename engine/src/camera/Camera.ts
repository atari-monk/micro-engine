import { ICamera, IRendererV2, ITilemapDataFactory, IVector2 } from 'engine_api'
import Vector2 from '../math/Vector2'

export default class Camera implements ICamera {
  private _center0: IVector2
  private _center: IVector2 = new Vector2(0, 0)
  private _delta: IVector2 = new Vector2(0, 0)
  private _tileMap?: ITilemapDataFactory

  constructor(private readonly _renderer: IRendererV2) {
    this._center0 = this._renderer.getCenter()
  }

  load(tileMap: ITilemapDataFactory) {
    this._tileMap = tileMap
  }

  setPosition(position: IVector2): void {
    this._center.x = this._center0.x
    this._center.y = this._center0.y
    this._delta = this._center
      .subtract(position)
      .add(
        new Vector2(
          this._tileMap?.mapOffset.x ?? 0,
          this._tileMap?.mapOffset.y ?? 0
        )
      )
    this._renderer.translate(this._delta)
  }
}
