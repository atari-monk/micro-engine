import { Operation } from './Operation'

export class OperationMap {
  private operations: Operation[] = []

  addOperation(operation: Operation): void {
    this.operations.push(operation)
  }

  executeOperations(param?: string): void {
    this.operations.forEach((operation) => operation(param))
  }
}
