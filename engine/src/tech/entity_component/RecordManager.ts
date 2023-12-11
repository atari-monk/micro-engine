import { ILogger, IManager } from 'engine_api'
import ManagerLogger from './ManagerLogger'

/**
 * @deprecated Use the MapManager instead. This class will be removed in future versions.
 */
export default class RecordManager<T>
  extends ManagerLogger
  implements IManager<T>
{
  private _list: Record<string, T> = {}

  get count(): number {
    return Object.keys(this._list).length
  }

  constructor(logger?: ILogger) {
    super(logger)
  }

  add(name: string, config: T) {
    this._list[name] = config
  }

  remove(name: string) {
    delete this._list[name]
  }

  removeAll() {
    this._list = {}
  }

  get(name: string): T | undefined {
    return this._list[name]
  }

  getStrict(name: string): T {
    const object = this._list[name]
    if (object === undefined) {
      const message = this.getNotFoundMessage(name)
      this.logError(message)
      throw new Error(message)
    }
    return object
  }

  getWithStatus(name: string): {
    found: boolean
    object?: T | undefined
  } {
    const object = this._list[name]
    return { found: object !== undefined, object }
  }

  forEach(callback: (name: string, object: T) => void): void {
    for (const [name, object] of Object.entries(this._list)) {
      callback(name, object)
    }
  }

  protected values(): T[] {
    return Object.values(this._list)
  }
}
