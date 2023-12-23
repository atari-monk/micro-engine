import { IObject, IVector2 } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'
import Component from '../entity_component/Component'

export default class ObjectComponent extends Component implements IObject {
  public id: string
  public position: IVector2
  public size: IVector2
  public color: string
  public speed: IVector2
  public spriteOffset: IVector2

  constructor(objectConfig: IObject) {
    super('ObjectComponent')
    this.id = objectConfig.id
    this.position = Vector2.fromObject(objectConfig.position)
    this.size = Vector2.fromObject(objectConfig.size)
    this.color = objectConfig.color
    this.speed = Vector2.fromObject(objectConfig.speed)
    this.spriteOffset = Vector2.fromObject(objectConfig.spriteOffset)
  }

  update(dt: number) {}

  render(dt: number) {}
}
