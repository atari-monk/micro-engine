export default class AssertHelper {
  private target: any

  constructor(target: any) {
    this.target = target
  }

  assertField(fieldName: string): void {
    if (!(fieldName in this.target) || this.target[fieldName] === undefined) {
      throw new Error(`Assertion failed: ${fieldName} must be set`)
    }
  }

  assertNested(fieldName: string, nestedFieldName: string): void {
    this.assertField(fieldName)

    const field = this.target[fieldName]

    if (!(nestedFieldName in field) || field[nestedFieldName] === undefined) {
      throw new Error(
        `Assertion failed: ${nestedFieldName} must be set in ${fieldName}`
      )
    }
  }

  assert(condition: boolean, message: string): void {
    if (condition) {
      throw new Error(`Assertion failed: ${message}`)
    }
  }
}
