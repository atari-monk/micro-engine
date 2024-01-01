export default interface IImmutableVector3 {
  x: number
  y: number
  z: number

  add(other: IImmutableVector3): IImmutableVector3
  subtract(other: IImmutableVector3): IImmutableVector3
  multiply(scalar: number): IImmutableVector3
  divide(other: IImmutableVector3): IImmutableVector3
  dot(other: IImmutableVector3): number
  length(): number
  squaredLength(): number
  normalize(): IImmutableVector3
}
