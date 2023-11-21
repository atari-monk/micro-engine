import { IObjectConfig, IObjectEntityConfig } from 'engine_api'
import ObjectEntity from './ObjectEntity'
import PlayerEntity from './PlayerEntity'

export default class EntityFactory {
  constructor(private readonly _entityConfig: IObjectEntityConfig) {}

  createObjectEntity(objConfig?: IObjectConfig): ObjectEntity {
    const finalConfig: IObjectEntityConfig = this._entityConfig
    finalConfig.objectConfig = {
      ...this._entityConfig.objectConfig,
      ...(objConfig || {}),
    }
    return new ObjectEntity(finalConfig)
  }

  createPlayerEntity(objConfig?: IObjectConfig): PlayerEntity {
    const finalConfig: IObjectEntityConfig = this._entityConfig
    finalConfig.objectConfig = {
      ...this._entityConfig.objectConfig,
      ...(objConfig || {}),
    }
    return new PlayerEntity(finalConfig)
  }
}
