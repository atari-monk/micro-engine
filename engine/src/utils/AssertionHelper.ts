export default class AssertHelper {
  private target: any

  constructor(target: any) {
    this.target = target
  }

  assertField(fieldName: string): void {
    if (!(fieldName in this.target)) {
      throw new Error(`Assertion failed: ${fieldName} must be set`)
    }
  }
}
