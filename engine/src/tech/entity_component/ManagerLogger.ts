import { ILogger } from 'engine_api'
import LogManagerSingleton from '../log_manager/LogManagerSingleton'

export default class ManagerLogger {
  constructor(private _logger: ILogger = LogManagerSingleton.getLogger()) {}

  protected getAlreadyExistsMessage(name: string) {
    return `Object with name '${name}' already exists!`
  }

  protected getNotFoundMessage(name: string) {
    return `Object with name '${name}' not found!`
  }

  logError(message: string): void {
    this._logger.error(message)
  }

  logDebug(message: string): void {
    this._logger.debug(message)
  }
}
