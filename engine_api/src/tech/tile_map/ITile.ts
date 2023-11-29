import IVector2 from '../../math/vector/IImmutableVector2'

export default interface ITile {
  id: number
  size: IVector2
  rgba: string
  desc: string
}
