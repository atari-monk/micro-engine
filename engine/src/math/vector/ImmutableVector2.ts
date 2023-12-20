import { IImmutableVector2 } from 'engine_api'
import { MathOperation } from './MathOperation'
import { mathOperationMap } from './mathOperationMap'

export default class ImmutableVector2 implements IImmutableVector2 {
  constructor(public readonly x: number = 0, public readonly y: number = 0) {}

  private operateWithImmutableVector(
    { x = 0, y = 0 }: IImmutableVector2 | { x: number; y: number } = {
      x: 0,
      y: 0,
    },
    operation: MathOperation = 'add'
  ): ImmutableVector2 {
    return new ImmutableVector2(
      mathOperationMap[operation](this.x, x),
      mathOperationMap[operation](this.y, y)
    )
  }

  operate(
    { x = 0, y = 0 }: IImmutableVector2 | { x?: number; y?: number } = {},
    operation: MathOperation = 'add'
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
