import { IRandomNumberGenerator } from 'engine_api'

export default class RandomNumberGenerator implements IRandomNumberGenerator {
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  getRandomFloat(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  getRandomBoolean(): boolean {
    return Math.random() < 0.5 // 50% chance of true or false
  }

  getRandomArrayElement<T>(array: T[]): T {
    const randomIndex = this.getRandomInt(0, array.length - 1)
    return array[randomIndex]
  }
}
