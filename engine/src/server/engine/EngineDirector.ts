import { IGameServerApi, LogLevel } from 'engine_api'
import LogManager from '../../tech/log_manager/LogManager'
import EngineBuilder from './EngineBuilder'
import EntityManager from '../../tech/entity_component/EntityManager'
import Tilemap from '../../tech/tile_map/Tilemap'
import ObjectEntityBuilder from '../entity/builder/ObjectEntityBuilder'
import PlayerEntityBuilder from '../entity/builder/PlayerEntityBuilder'
import EntityDataManager from '../../browser/entity/EntityDataManager'
import MapEntityBuilder from '../../browser/entity/builder/MapEntitBuilder'
import EntityCreator from '../entity/EntityCreator'
import PlayerManager from '../entity/PlayerManager'
import { RendererMock } from '../../tech/renderer/RendererMock'
import GameLoop from '../game_loop/GameLoop'

export default class EngineDirector {
  createEngine(serverApi: IGameServerApi) {
    const engine = new EngineBuilder()
      .withLogger(new LogManager(LogLevel.DEBUG))
      .withGameServerApi(serverApi)
      .withPlayerManager(new PlayerManager())
      .withGameLoop(new GameLoop())
      .withEntityDataManager(new EntityDataManager())
      .withEntityManager(new EntityManager())
      .withRenderer(new RendererMock())
      .withTileMap(new Tilemap())
      .withEntityCreator(
        new EntityCreator(),
        new MapEntityBuilder(),
        new ObjectEntityBuilder(),
        new PlayerEntityBuilder()
      )
      .build()
    return engine
  }
}
