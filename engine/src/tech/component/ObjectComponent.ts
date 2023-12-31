import { IObject, IVector2 } from 'engine_api'
import Vector2 from '../../math/vector/Vector2'
import Component from '../entity_component/Component'

export default class ObjectComponent extends Component implements IObject {
  public id: string
  public position: IVector2
  public size: IVector2
  public color: string
  public moveStep: IVector2
  public mass: number
  public spriteOffset: IVector2
  public velocity: IVector2
  public score: number
  public useArrowKeys: boolean
  public isFlipped: boolean

  constructor(objData: IObject) {
    super('ObjectComponent')
    this.id = objData.id
    this.position = Vector2.getNew(objData.position)
    this.size = Vector2.getNew(objData.size)
    this.color = objData.color
    this.moveStep = Vector2.getNew(objData.moveStep)
    this.spriteOffset = Vector2.getNew(objData.spriteOffset)
    this.mass = objData.mass
    this.velocity = Vector2.getNew(objData.velocity)
    this.score = objData.score
    this.useArrowKeys = objData.useArrowKeys
    this.isFlipped = objData.isFlipped
  }

  update(dt: number) {}

  render(dt: number) {}
}
