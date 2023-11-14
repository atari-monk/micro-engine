export interface IVector2 {
  x: number
  y: number

  add(other: IVector2): IVector2
  subtract(other: IVector2): IVector2
  multiply(scalar: number): IVector2
  dot(other: IVector2): number
  length(): number
  squaredLength(): number
  normalize(): IVector2
}
