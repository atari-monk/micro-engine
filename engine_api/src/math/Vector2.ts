import { IVector2 } from './IVector2'

export class Vector2 implements IVector2 {
  constructor(public x: number, public y: number) {}

  add(other: IVector2): IVector2 {
    return new Vector2(this.x + (other?.x ?? 0), this.y + (other?.y ?? 0))
  }

  subtract(other: IVector2): IVector2 {
    return new Vector2(this.x - (other?.x ?? 0), this.y - (other?.y ?? 0))
  }

  multiply(scalar: number): IVector2 {
    return new Vector2(this.x * scalar, this.y * scalar)
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

  normalize(): IVector2 {
    const mag = this.length()
    return mag ? new Vector2(this.x / mag, this.y / mag) : new Vector2(0, 0)
  }
}
