import { IObject, IObjectDto, IVector2 } from 'engine_api'
import Vector2 from '../math/vector/Vector2'

export default class ObjectDto implements IObjectDto {
  public id: string
  public position: IVector2
  public size: IVector2
  public color: string
  public speed: IVector2

  constructor(objectComponent: IObject) {
    this.id = objectComponent.id
    this.position = objectComponent.position
    this.size = objectComponent.size
    this.color = objectComponent.color
    this.speed = objectComponent.speed
  }

  static fromData(data: {
    id: string
    position: IVector2
    size: IVector2
    color: string
    speed: IVector2
  }): ObjectDto {
    const objectDTO = new ObjectDto({} as IObject)
    objectDTO.id = data.id
    objectDTO.position = new Vector2(data.position.x, data.position.y)
    objectDTO.size = data.size
    objectDTO.color = data.color
    objectDTO.speed = data.speed
    return objectDTO
  }

  toData(): {
    id: string
    position: IVector2
    size: IVector2
    color: string
    speed: IVector2
  } {
    return {
      id: this.id,
      position: this.position,
      size: this.size,
      color: this.color,
      speed: this.speed,
    }
  }
}
