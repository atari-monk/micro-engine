import IImmutableVector2 from './IImmutableVector2'

export default interface IVector2 {
  x: number
  y: number

  setValues(v: IVector2): void
  convert(v: IImmutableVector2): void
  add(other: IVector2): this
  subtract(other: IVector2): this
  multiply(scalar: number): this
  divide(other: IVector2): this
  dot(other: IVector2): number
  length(): number
  squaredLength(): number
  normalize(): this
}
