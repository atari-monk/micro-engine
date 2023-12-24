import { IObject, IVector2 } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'
import Component from '../entity_component/Component'

export default class ObjectComponent extends Component implements IObject {
  public id: string
  public position: IVector2
  public size: IVector2
  public color: string
  public speed: IVector2
  public mass: number
  public spriteOffset: IVector2

  constructor(objData: IObject) {
    super('ObjectComponent')
    this.id = objData.id
    this.position = Vector2.fromObject(objData.position)
    this.size = Vector2.fromObject(objData.size)
    this.color = objData.color
    this.speed = Vector2.fromObject(objData.speed)
    this.spriteOffset = Vector2.fromObject(objData.spriteOffset)
    this.mass = objData.mass
  }

  update(dt: number) {}

  render(dt: number) {}
}
