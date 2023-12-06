import {
  IInputManager,
  ILogger,
  IObject,
  IRendererV2,
  ITilemap,
} from 'engine_api'
import ObjectEntity from './ObjectEntity'
import PlayerEntity from './PlayerEntity'
import MapEntityBuilder from './MapEntitBuilder'
import ProtoObjectEntityBuilder from './ProtoObjectEntityBuilder'
import MapEntity from './MapEntity'
import PlayerEntityBuilder from './PlayerEntityBuilder'

export default class EntityFactory {
  private readonly mapEntityBuilder = new MapEntityBuilder(MapEntity)
  private readonly objectEntityBuilder = new ProtoObjectEntityBuilder(
    ObjectEntity
  )
  private readonly playerEntityBuilder = new PlayerEntityBuilder(PlayerEntity)

  setMapEntityBuilderDependencyList(logger: ILogger, tileMap: ITilemap) {
    this.mapEntityBuilder.setLogger(logger)
    this.mapEntityBuilder.setTileMap(tileMap)
  }

  createMapEntity() {
    return this.mapEntityBuilder.build()
  }

  setObjectEntityBuilderDependencyList(
    logger: ILogger,
    objectData: IObject,
    renderer: IRendererV2
  ) {
    this.objectEntityBuilder.setLogger(logger)
    this.objectEntityBuilder.setObjectData(objectData)
    this.objectEntityBuilder.setRenderer(renderer)
  }

  createObjectEntity() {
    return this.objectEntityBuilder.build()
  }

  setPlayerEntityBuilderDependencyList(
    logger: ILogger,
    objectData: IObject,
    renderer: IRendererV2,
    input: IInputManager
  ) {
    this.playerEntityBuilder.setLogger(logger)
    this.playerEntityBuilder.setObjectData(objectData)
    this.playerEntityBuilder.setRenderer(renderer)
    this.playerEntityBuilder.setInput(input)
  }

  createPlayerEntity() {
    return this.playerEntityBuilder.build()
  }
}
