export default interface IRandomNumberGenerator {
  getRandomInt(min: number, max: number): number
  getRandomFloat(min: number, max: number): number
  getRandomBoolean(): boolean
  getRandomArrayElement<T>(array: T[]): T
}
