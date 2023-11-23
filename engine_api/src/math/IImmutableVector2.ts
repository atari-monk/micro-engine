export default interface IImmutableVector2 {
  x: number
  y: number

  add(other: IImmutableVector2): IImmutableVector2
  subtract(other: IImmutableVector2): IImmutableVector2
  multiply(scalar: number): IImmutableVector2
  divide(other: IImmutableVector2): IImmutableVector2
  dot(other: IImmutableVector2): number
  length(): number
  squaredLength(): number
  normalize(): IImmutableVector2
}
