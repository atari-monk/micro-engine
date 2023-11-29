import IVector2 from '../../math/vector/IImmutableVector2'

export default interface IObject {
  id: string
  position: IVector2
  size: IVector2
  color: string
  speed: IVector2
}
