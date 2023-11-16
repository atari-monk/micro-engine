import { IComponent, IVector2 } from 'engine_api'
import Vector2 from '../math/Vector2'

export default class PositionComponent implements IComponent {
  public position: IVector2

  constructor(initialPosition: IVector2 = Vector2.zero()) {
    this.position = initialPosition
  }

  update() {}

  render() {}
}
