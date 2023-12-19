import { ILogger } from 'engine_api'

export default class EntityBuilderBase {
  protected _logger?: ILogger

  withLogger(logger: ILogger): this {
    this._logger = logger
    return this
  }
}
