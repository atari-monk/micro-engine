import { IComponent, IObject, IObjectConfig, IVector2 } from 'engine_api'

export default class ObjectComponent implements IComponent, IObject {
  public position: IVector2
  public size: IVector2
  public color: string
  public speed: IVector2

  constructor(objectConfig: IObjectConfig) {
    this.position = objectConfig.position
    this.size = objectConfig.size
    this.color = objectConfig.color
    this.speed = objectConfig.speed
  }

  update(dt: number) {}

  render(dt: number) {}
}
