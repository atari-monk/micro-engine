import IVector2 from '../../math/vector/IVector2'

export default interface IObject {
  id: string
  name: string
  position: IVector2
  size: IVector2
  color: string
  speed: IVector2
  mass: number
  spriteOffset: IVector2
}
