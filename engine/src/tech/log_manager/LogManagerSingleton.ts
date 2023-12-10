import { ILogger } from 'engine_api'
import LogManager from './LogManager'

export default class LogManagerSingleton {
  private static loggerInstance: ILogger | null = null

  static getLogger(): ILogger {
    if (!LogManagerSingleton.loggerInstance) {
      LogManagerSingleton.loggerInstance = new LogManager()
    }
    return LogManagerSingleton.loggerInstance
  }

  static setLogger(logger: ILogger): void {
    LogManagerSingleton.loggerInstance = logger
  }
}
