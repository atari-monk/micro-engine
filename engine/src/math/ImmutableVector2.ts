import { IImmutableVector2 } from 'engine_api'

type Operation = 'add' | 'subtract' | 'multiply' | 'divide'

const operationMap: Record<Operation, (a: number, b: number) => number> = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b !== 0 ? a / b : a),
}

export default class ImmutableVector2 implements IImmutableVector2 {
  constructor(public readonly x: number = 0, public readonly y: number = 0) {}

  private operateWithImmutableVector(
    { x = 0, y = 0 }: IImmutableVector2 | { x: number; y: number } = {
      x: 0,
      y: 0,
    },
    operation: Operation = 'add'
  ): ImmutableVector2 {
    return new ImmutableVector2(
      operationMap[operation](this.x, x),
      operationMap[operation](this.y, y)
    )
  }

  operate(
    { x = 0, y = 0 }: IImmutableVector2 | { x?: number; y?: number } = {},
    operation: Operation = 'add'
  ): ImmutableVector2 {
    return this.operateWithImmutableVector({ x, y }, operation)
  }

  add(other: IImmutableVector2): ImmutableVector2 {
    return this.operateWithImmutableVector(other, 'add')
  }

  subtract(other: IImmutableVector2): ImmutableVector2 {
    return this.operateWithImmutableVector(other, 'subtract')
  }

  multiply(scalar: number): ImmutableVector2 {
    return this.operateWithImmutableVector({ x: scalar, y: scalar }, 'multiply')
  }

  divide(other: ImmutableVector2): ImmutableVector2 {
    return this.operateWithImmutableVector(other, 'divide')
  }

  dot(other: IImmutableVector2): number {
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
    return mag !== 0
      ? this.operateWithImmutableVector({ x: mag, y: mag }, 'divide')
      : new ImmutableVector2()
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
