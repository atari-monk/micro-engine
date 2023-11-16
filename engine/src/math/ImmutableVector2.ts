import { IVector2 } from 'engine_api'

export default class ImmutableVector2 implements IVector2 {
  constructor(public readonly x: number = 0, public readonly y: number = 0) {}

  operate(
    { x = 0, y = 0 }: IVector2 | { x?: number; y?: number } = {},
    operation: 'add' | 'subtract' | 'multiply' | 'divide' = 'add'
  ): ImmutableVector2 {
    switch (operation) {
      case 'add':
        return new ImmutableVector2(this.x + x, this.y + y)
      case 'subtract':
        return new ImmutableVector2(this.x - x, this.y - y)
      case 'multiply':
        return new ImmutableVector2(this.x * x, this.y * y)
      case 'divide':
        return new ImmutableVector2(
          x !== 0 ? this.x / x : this.x,
          y !== 0 ? this.y / y : this.y
        )
      default:
        throw new Error(`Unsupported operation: ${operation}`)
    }
  }

  add(other: IVector2): ImmutableVector2 {
    return this.operate(other, 'add')
  }

  subtract(other: IVector2): ImmutableVector2 {
    return this.operate(other, 'subtract')
  }

  multiply(scalar: number): ImmutableVector2 {
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

  normalize(): ImmutableVector2 {
    const mag = this.length()
    if (mag !== 0) {
      return this.operate({ x: mag, y: mag }, 'divide')
    } else {
      return new ImmutableVector2()
    }
  }

  static zero(): ImmutableVector2 {
    return new ImmutableVector2()
  }

  static unitX(): ImmutableVector2 {
    return new ImmutableVector2(1, 0)
  }

  static unitY(): ImmutableVector2 {
    return new ImmutableVector2(0, 1)
  }
}
