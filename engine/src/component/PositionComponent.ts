import { IComponent, IVector2 } from 'engine_api'
import Vector2 from '../math/Vector2'

export class PositionComponent implements IComponent {
  private _position: IVector2

  constructor(initialPosition: IVector2 = Vector2.zero()) {
    this._position = initialPosition
  }

  get position(): IVector2 {
    return this._position
  }

  set position(newPosition: IVector2) {
    this._position = newPosition
  }

  update() {}

  render() {}
}
