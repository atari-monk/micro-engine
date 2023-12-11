import { IManager } from 'engine_api'

export default class RecordManager<T> implements IManager<T> {
  protected _list: Record<string, T> = {}

  get count(): number {
    return Object.keys(this._list).length
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
      throw new Error(`Object with name '${name}' not found!`)
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
}
