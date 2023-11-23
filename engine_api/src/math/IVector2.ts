export default interface IVector2 {
  x: number
  y: number

  add(other: IVector2): this
  subtract(other: IVector2): this
  multiply(scalar: number): this
  divide(other: IVector2): this
  dot(other: IVector2): number
  length(): number
  squaredLength(): number
  normalize(): this
}
