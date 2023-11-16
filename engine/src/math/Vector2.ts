import { IVector2 } from 'engine_api'

export default class Vector2 implements IVector2 {
  public x: number
  public y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  operate(
    { x = 0, y = 0 }: IVector2 | { x?: number; y?: number } = {},
    operation: 'add' | 'subtract' | 'multiply' | 'divide' = 'add'
  ): this {
    switch (operation) {
      case 'add':
        this.x += x
        this.y += y
        break
      case 'subtract':
        this.x -= x
        this.y -= y
        break
      case 'multiply':
        this.x *= x
        this.y *= y
        break
      case 'divide':
        if (x !== 0) this.x /= x
        if (y !== 0) this.y /= y
        break
      default:
        throw new Error(`Unsupported operation: ${operation}`)
    }

    return this
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

  static zero(): Vector2 {
    return new Vector2()
  }

  static unitX(): Vector2 {
    return new Vector2(1, 0)
  }

  static unitY(): Vector2 {
    return new Vector2(0, 1)
  }
}
