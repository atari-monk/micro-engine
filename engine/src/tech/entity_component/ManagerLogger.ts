import { ILogable, ILogger } from 'engine_api'

export default class ManagerLogger implements ILogable {
  private _logger: ILogger = this.createDummyLogger()

  set logger(logger: ILogger) {
    this._logger = logger
  }

  private createDummyLogger(): ILogger {
    const logNotSet = () => {
      console.log('Logger not set')
    }

    const dummyLogger: ILogger = {
      debug: logNotSet,
      error: logNotSet,
      setLogLevel: logNotSet,
      log: logNotSet,
      warn: logNotSet,
    }

    return dummyLogger
  }

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
