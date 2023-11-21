import { IObjectConfig, IObjectEntityConfig } from 'engine_api'
import ObjectEntity from '../entity/ObjectEntity'

export default class ObjectEntityFactory {
  constructor(private readonly _config: IObjectEntityConfig) {}

  createObjectEntity(objectConfig?: IObjectConfig): ObjectEntity {
    const finalConfig: IObjectEntityConfig = this._config
    finalConfig.objectConfig = {
      ...this._config.objectConfig,
      ...(objectConfig || {}),
    }
    return new ObjectEntity(finalConfig)
  }
}
