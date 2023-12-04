import {
  IInputManager,
  ILogger,
  IObject,
  IRendererV2,
  ITilemap,
} from 'engine_api'
import ObjectEntity from './ObjectEntity'
import PlayerEntity from './PlayerEntity'
import MapEntity from './MapEntity'

export default class EntityFactory {
  createMapEntity(logger: ILogger, tileMap: ITilemap) {
    return new MapEntity(logger, tileMap)
  }

  createObjectEntity(
    logger: ILogger,
    objectData: IObject,
    renderer: IRendererV2
  ) {
    return new ObjectEntity(logger, objectData, renderer)
  }

  createPlayerEntity(
    logger: ILogger,
    objectData: IObject,
    renderer: IRendererV2,
    input: IInputManager
  ) {
    return new PlayerEntity(objectData, renderer, input, logger)
  }
}
