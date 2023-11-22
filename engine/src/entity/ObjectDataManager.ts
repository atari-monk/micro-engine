import { IObjectConfig, IObjectDataManager } from 'engine_api'

export default class ObjectDataManager implements IObjectDataManager {
  private objectData: Record<string, IObjectConfig> = {}

  addObjectData(name: string, config: IObjectConfig) {
    this.objectData[name] = config
  }

  getObjectData(name: string): IObjectConfig {
    return this.objectData[name]
  }

  getAllObjectData(): Record<string, IObjectConfig> {
    return this.objectData
  }

  removeObjectData(name: string) {
    delete this.objectData[name]
  }

  removeAllObjectData() {
    this.objectData = {}
  }
}
