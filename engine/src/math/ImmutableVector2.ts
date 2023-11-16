import { IVector2 } from 'engine_api'

export class ImmutableVector2 implements IVector2 {
  constructor(public readonly x: number, public readonly y: number) {}

  add(other: IVector2): ImmutableVector2 {
    return new ImmutableVector2(
      this.x + (other?.x ?? 0),
      this.y + (other?.y ?? 0)
    )
  }

  subtract(other: IVector2): ImmutableVector2 {
    return new ImmutableVector2(
      this.x - (other?.x ?? 0),
      this.y - (other?.y ?? 0)
    )
  }

  multiply(scalar: number): ImmutableVector2 {
    return new ImmutableVector2(this.x * scalar, this.y * scalar)
  }

  dot(other: IVector2): number {
    return this.x * other.x + this.y * other.y
  }

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y)
  }

  squaredLength(): number {
    return this.x * this.x + this.y * this.y
  }

  normalize(): ImmutableVector2 {
    const mag = this.length()
    return mag
      ? new ImmutableVector2(this.x / mag, this.y / mag)
      : new ImmutableVector2(0, 0)
  }
}
