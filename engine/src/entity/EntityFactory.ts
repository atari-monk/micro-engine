import {
  IMapEntityConfig,
  IObjectEntityConfig,
  IPlayerEntityConfig,
} from 'engine_api'
import ObjectEntity from './ObjectEntity'
import PlayerEntity from './PlayerEntity'
import MapEntity from './MapEntity'

export default class EntityFactory {
  createMapEntity(config: IMapEntityConfig) {
    return new MapEntity(config)
  }

  createObjectEntity(config: IObjectEntityConfig) {
    return new ObjectEntity(config)
  }

  createPlayerEntity(config: IPlayerEntityConfig) {
    return new PlayerEntity(config)
  }
}
