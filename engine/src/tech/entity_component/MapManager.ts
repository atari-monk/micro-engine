import { ILogger, IManager } from 'engine_api'
import ManagerLogger from './ManagerLogger'

export default class MapManager<T>
  extends ManagerLogger
  implements IManager<T>
{
  private _list: Map<string, T> = new Map<string, T>()

  get count(): number {
    return this._list.size
  }

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

  protected values(): IterableIterator<T> {
    return this._list.values()
  }
}
