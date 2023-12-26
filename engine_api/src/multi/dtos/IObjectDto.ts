import IVector2 from '../../math/vector/IVector2'

export default interface IObjectDto {
  id: string
  position: IVector2
  size: IVector2
  color: string
  moveStep: IVector2
  velocity: IVector2

  toData(): {
    id: string
    position: IVector2
    size: IVector2
    color: string
    moveStep: IVector2
    velocity: IVector2
  }
}
