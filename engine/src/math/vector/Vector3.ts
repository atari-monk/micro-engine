import IImmutableVector3 from './IImmutableVector3'
import IVector3 from './IVector3'
import { MathOperation } from './MathOperation'
import { mathOperationMap } from './mathOperationMap'

export default class Vector3 implements IVector3 {
  public x: number
  public y: number
  public z: number

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x
    this.y = y
    this.z = z
  }

  static getNew(vector: IVector3): Vector3 {
    return new Vector3(vector.x, vector.y, vector.z)
  }

  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z)
  }

  private operate(
    { x = 0, y = 0, z = 0 }: IVector3 | { x: number; y: number; z: number } = {
      x: 0,
      y: 0,
      z: 0,
    },
    operation: MathOperation = 'add'
  ): this {
    this.x = mathOperationMap[operation](this.x, x)
    this.y = mathOperationMap[operation](this.y, y)
    this.z = mathOperationMap[operation](this.z, z)

    return this
  }

  setValues(v: IVector3): this {
    this.x = v.x
    this.y = v.y
    this.z = v.z
    return this
  }

  convert(v: IImmutableVector3): void {
    this.x = v.x
    this.y = v.y
    this.z = v.z
  }

  add(other: IVector3): this {
    return this.operate(other, 'add')
  }

  subtract(other: IVector3): this {
    return this.operate(other, 'subtract')
  }

  multiply(scalar: number): this {
    return this.operate({ x: scalar, y: scalar, z: scalar }, 'multiply')
  }

  divide(other: IVector3): this {
    return this.operate(other, 'divide')
  }

  dot(other: IVector3): number {
    return this.x * other.x + this.y * other.y + this.z * other.z
  }

  length(): number {
    return Math.sqrt(this.squaredLength())
  }

  squaredLength(): number {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }

  normalize(): this {
    const mag = this.length()
    if (mag !== 0) {
      this.operate({ x: mag, y: mag, z: mag }, 'divide')
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

  equals(v: IVector3): boolean {
    return this.x === v.x && this.y === v.y && this.z === v.z
  }

  static zero(): Vector3 {
    return new Vector3()
  }

  static unitX(): Vector3 {
    return new Vector3(1, 0, 0)
  }

  static unitY(): Vector3 {
    return new Vector3(0, 1, 0)
  }

  static unitZ(): Vector3 {
    return new Vector3(0, 0, 1)
  }
}
