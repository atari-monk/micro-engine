import { IObject, IObjectDto, IVector2 } from 'engine_api'
import Vector2 from '../math/vector/Vector2'

export default class ObjectDto implements IObjectDto {
  public id: string
  public position: IVector2
  public size: IVector2
  public color: string
  public moveStep: IVector2
  public velocity: IVector2

  constructor(objData: IObject) {
    this.id = objData.id
    this.position = objData.position
    this.size = objData.size
    this.color = objData.color
    this.moveStep = objData.moveStep
    this.velocity = objData.velocity
  }

  static fromData(data: {
    id: string
    position: IVector2
    size: IVector2
    color: string
    moveStep: IVector2
    velocity: IVector2
  }): ObjectDto {
    const dto = new ObjectDto({} as IObject)
    dto.id = data.id
    dto.position = new Vector2(data.position.x, data.position.y)
    dto.size = data.size
    dto.color = data.color
    dto.moveStep = data.moveStep
    dto.velocity = data.velocity
    return dto
  }

  toData(): {
    id: string
    position: IVector2
    size: IVector2
    color: string
    moveStep: IVector2
    velocity: IVector2
  } {
    return {
      id: this.id,
      position: this.position,
      size: this.size,
      color: this.color,
      moveStep: this.moveStep,
      velocity: this.velocity,
    }
  }
}
