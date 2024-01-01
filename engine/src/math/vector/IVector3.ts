import IImmutableVector3 from './IImmutableVector3'

export default interface IVector3 {
  x: number
  y: number
  z: number

  setValues(v: IVector3): this
  convert(v: IImmutableVector3): void
  add(other: IVector3): this
  subtract(other: IVector3): this
  multiply(scalar: number): this
  divide(other: IVector3): this
  dot(other: IVector3): number
  length(): number
  squaredLength(): number
  normalize(): this
  clampLength(min: number, max: number): this
  clone(): IVector3
  equals(v: IVector3): boolean
}
