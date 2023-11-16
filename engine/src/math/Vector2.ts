import { IVector2 } from 'engine_api'

export class Vector2 implements IVector2 {
  constructor(public x: number = 0, public y: number = 0) {}

  add(other: IVector2): this {
    this.x += other?.x ?? 0
    this.y += other?.y ?? 0
    return this
  }

  subtract(other: IVector2): this {
    this.x -= other?.x ?? 0
    this.y -= other?.y ?? 0
    return this
  }

  multiply(scalar: number): this {
    this.x *= scalar
    this.y *= scalar
    return this
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

  normalize(): this {
    const mag = this.length()
    if (mag !== 0) {
      this.x /= mag
      this.y /= mag
    }
    return this
  }

  static zero(): Vector2 {
    return new Vector2(0, 0)
  }

  static unitX(): Vector2 {
    return new Vector2(1, 0)
  }

  static unitY(): Vector2 {
    return new Vector2(0, 1)
  }
}
