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
  createMapEntity(tileMap: ITilemap) {
    return new MapEntity(tileMap)
  }

  createObjectEntity(objectData: IObject, renderer: IRendererV2) {
    return new ObjectEntity(objectData, renderer)
  }

  createPlayerEntity(
    objectData: IObject,
    renderer: IRendererV2,
    input: IInputManager,
    logger: ILogger
  ) {
    return new PlayerEntity(objectData, renderer, input, logger)
  }
}
