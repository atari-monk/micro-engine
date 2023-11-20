import { IComponent, IObject, IObjectConfig, IVector2 } from 'engine_api'

export default class ObjectComponent implements IComponent, IObject {
  public position: IVector2
  public size: IVector2
  public color: string

  constructor(objectConfig: IObjectConfig) {
    this.position = objectConfig.position
    this.size = objectConfig.size
    this.color = objectConfig.color
  }

  update() {}

  render() {}
}
