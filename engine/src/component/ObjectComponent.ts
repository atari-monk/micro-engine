import { IComponent, IObject, IObjectConfig, IVector2 } from 'engine_api'
import Vector2 from '../math/Vector2'

export default class ObjectComponent implements IComponent, IObject {
  public position: IVector2
  public size: IVector2
  public color: string
  public speed: IVector2

  constructor(objectConfig: IObjectConfig) {
    this.position = new Vector2(
      objectConfig.position.x,
      objectConfig.position.y
    )
    this.size = new Vector2(objectConfig.size.x, objectConfig.size.y)
    this.color = objectConfig.color
    this.speed = new Vector2(objectConfig.speed.x, objectConfig.speed.y)
  }

  update(dt: number) {}

  render(dt: number) {}
}
