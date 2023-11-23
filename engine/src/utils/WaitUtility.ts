export default class WaitUtility {
  static async wait(seconds: number): Promise<void> {
    console.log(`Wait for ${seconds} seconds...`)
    await new Promise((resolve) => setTimeout(resolve, 1000 * seconds))
    console.log('Done Waiting!')
  }
}
