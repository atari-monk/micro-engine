import { IImmutableVector2, IVector2 } from 'engine_api'
import { MathOperation } from './MathOperation'
import { mathOperationMap } from './mathOperationMap'

export default class Vector2 implements IVector2 {
  public x: number
  public y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  static getNew(vector: IVector2) {
    return new Vector2(vector.x, vector.y)
  }

  clone() {
    return new Vector2(this.x, this.y)
  }

  private operate(
    { x = 0, y = 0 }: IVector2 | { x: number; y: number } = { x: 0, y: 0 },
    operation: MathOperation = 'add'
  ): this {
    this.x = mathOperationMap[operation](this.x, x)
    this.y = mathOperationMap[operation](this.y, y)

    return this
  }

  setValues(v: IVector2) {
    this.x = v.x
    this.y = v.y
    return this
  }

  convert(v: IImmutableVector2) {
    this.x = v.x
    this.y = v.y
  }

  add(other: IVector2): this {
    return this.operate(other, 'add')
  }

  subtract(other: IVector2): this {
    return this.operate(other, 'subtract')
  }

  multiply(scalar: number): this {
    return this.operate({ x: scalar, y: scalar }, 'multiply')
  }

  divide(other: IVector2): this {
    return this.operate(other, 'divide')
  }

  dot(other: IVector2): number {
    return this.x * other.x + this.y * other.y
  }

  length(): number {
    return Math.hypot(this.x, this.y)
  }

  squaredLength(): number {
    return this.x * this.x + this.y * this.y
  }

  normalize(): this {
    const mag = this.length()
    if (mag !== 0) {
      this.operate({ x: mag, y: mag }, 'divide')
    }
    return this
  }

  clampLength(min: number, max: number): this {
    const currentLength = this.length()
    if (currentLength < min) {
      this.normalize().multiply(min)
    } else if (currentLength > max) {
      this.normalize().multiply(max)
    }
    return this
  }

  equals(v: IVector2) {
    return this.x === v.x && this.y === v.y
  }

  static zero: Vector2 = new Vector2(0, 0)
  static one: Vector2 = new Vector2(1, 1)
  static unitX: Vector2 = new Vector2(1, 0)
  static unitY: Vector2 = new Vector2(0, 1)
}
