import { MathOperation } from './MathOperation'

export const mathOperationMap: Record<
  MathOperation,
  (a: number, b: number) => number
> = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => (b !== 0 ? a / b : a),
}
