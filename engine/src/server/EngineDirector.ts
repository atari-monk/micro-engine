import { IGameServerApi, LogLevel } from 'engine_api'
import LogManager from '../tech/log_manager/LogManager'
import EngineBuilder from './EngineBuilder'
import EntityManager from '../tech/entity_component/EntityManager'
import Tilemap from '../tech/tile_map/Tilemap'
import EntityDataManager from '../tech/entity/EntityDataManager'
import PlayerManager from './PlayerManager'
import { RendererMock } from '../tech/renderer/RendererMock'
import GameLoop from './GameLoop'
import EntityCreator from '../tech/entity/creator/EntityCreator'

export default class EngineDirector {
  createEngine(serverApi: IGameServerApi) {
    return new EngineBuilder()
      .withLogger(new LogManager(LogLevel.DEBUG))
      .withGameServerApi(serverApi)
      .withPlayerManager(new PlayerManager())
      .withServerGameLoop(new GameLoop())
      .withEntityDataManager(new EntityDataManager())
      .withEntityManager(new EntityManager())
      .withRenderer(new RendererMock())
      .withTileMap(new Tilemap())
      .withEntityCreator(new EntityCreator())
      .buildServerEngine()
  }
}
