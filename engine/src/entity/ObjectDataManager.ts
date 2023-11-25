import { IObject, IObjectDataManager } from 'engine_api'

export default class ObjectDataManager implements IObjectDataManager {
  private objectData: Record<string, IObject> = {}

  addObjectData(name: string, config: IObject) {
    this.objectData[name] = config
  }

  getObjectData(name: string): IObject {
    return this.objectData[name]
  }

  getAllObjectData(): Record<string, IObject> {
    return this.objectData
  }

  removeObjectData(name: string) {
    delete this.objectData[name]
  }

  removeAllObjectData() {
    this.objectData = {}
  }
}
