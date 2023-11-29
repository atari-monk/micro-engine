import IObject from '../../browser/component/IObject'
import IVector2 from '../../math/vector/IVector2'

export default class ObjectDto {
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
    objectDTO.position = data.position
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
