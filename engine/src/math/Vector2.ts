import { IVector2 } from 'engine_api'

type Operation = 'add' | 'subtract' | 'multiply' | 'divide'

const operationMap: Record<Operation, (a: number, b: number) => number> = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b !== 0 ? a / b : a),
}

export default class Vector2 implements IVector2 {
  public x: number
  public y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }

  private operate(
    { x = 0, y = 0 }: IVector2 | { x: number; y: number } = { x: 0, y: 0 },
    operation: Operation = 'add'
  ): this {
    this.x = operationMap[operation](this.x, x)
    this.y = operationMap[operation](this.y, y)

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
