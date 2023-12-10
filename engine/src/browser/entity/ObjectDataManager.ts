import { IObject, IObjectDataManager } from 'engine_api'

export default class ObjectDataManagerOnRecord implements IObjectDataManager {
  private objectData: Record<string, IObject> = {}

  add(name: string, config: IObject) {
    this.objectData[name] = config
  }

  get(name: string): IObject | undefined {
    return this.objectData[name]
  }

  getStrict(name: string): IObject {
    return (
      this.objectData[name] ??
      (() => {
        throw new Error(`Object with name '${name}' not found!`)
      })
    )
  }

  getAll(): Record<string, IObject> {
    return { ...this.objectData }
  }

  remove(name: string) {
    delete this.objectData[name]
  }

  removeAll() {
    this.objectData = {}
  }
}
