import { ILogger, IManager } from 'engine_api'
import LogManagerSingleton from '../tech/log_manager/LogManagerSingleton'

export default class MapManager<T> implements IManager<T> {
  protected _list: Map<string, T> = new Map<string, T>()

  get count(): number {
    return this._list.size
  }

  constructor(private _logger: ILogger = LogManagerSingleton.getLogger()) {}

  add(name: string, object: T): void {
    if (this._list.has(name)) {
      this.logError(this.getAlreadyExistsMessage(name))
    } else {
      this._list.set(name, object)
    }
  }

  remove(name: string): void {
    this._list.delete(name)
  }

  removeAll(): void {
    this._list = new Map<string, T>()
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

  get(name: string): T | undefined {
    const object = this._list.get(name)
    if (object === undefined) {
      this.logError(this.getNotFoundMessage(name))
    }
    return object
  }

  getStrict(name: string): T {
    return (
      this._list.get(name) ??
      (() => {
        const message = this.getNotFoundMessage(name)
        this.logError(message)
        throw new Error(message)
      })()
    )
  }

  getWithStatus(name: string): { found: boolean; object?: T } {
    const object = this._list.get(name)

    if (object === undefined) {
      this.logError(this.getNotFoundMessage(name))
    }

    return { found: !!object, object }
  }

  forEach(callback: (name: string, object: T) => void): void {
    this._list.forEach((object, name) => {
      callback(name, object)
    })
  }
}
