import {
  IAllEntityConfig,
  IMapEntityConfig,
  IObjectConfig,
  IObjectEntityConfig,
  IPlayerEntityConfig,
} from 'engine_api'
import ObjectEntity from './ObjectEntity'
import PlayerEntity from './PlayerEntity'
import MapEntity from './MapEntity'

export default class EntityFactory {
  constructor(private readonly _entityConfig: IAllEntityConfig) {}

  createMapEntity(objConfig?: IObjectConfig): ObjectEntity {
    const finalConfig: IMapEntityConfig = this._entityConfig
    return new MapEntity(finalConfig)
  }

  createObjectEntity(objConfig?: IObjectConfig): ObjectEntity {
    const finalConfig: IObjectEntityConfig = this._entityConfig
    finalConfig.objectConfig = {
      ...this._entityConfig.objectConfig,
      ...(objConfig || {}),
    }
    return new ObjectEntity(finalConfig)
  }

  createPlayerEntity(objConfig?: IObjectConfig): PlayerEntity {
    const finalConfig: IPlayerEntityConfig = this._entityConfig
    finalConfig.objectConfig = {
      ...this._entityConfig.objectConfig,
      ...(objConfig || {}),
    }
    return new PlayerEntity(finalConfig)
  }
}
