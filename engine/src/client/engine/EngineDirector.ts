import { IGameClientApi, LogLevel } from 'engine_api'
import LogManager from '../../tech/log_manager/LogManager'
import InputManager from '../../tech/input_manager/InputManager'
import EntityManager from '../../tech/entity_component/EntityManager'
import Camera from '../../tech/camera/Camera'
import Tilemap from '../../tech/tile_map/Tilemap'
import RendererV2 from '../../tech/renderer/RendererV2'
import EntityDataManager from '../../browser/entity/EntityDataManager'
import EngineBuilder from './EngineBuilder'
import GameLoop from '../game_loop/GameLoop'
import EntityCreator from '../../browser/entity/EntityCreator'
import PlayerManager from '../entity/PlayerManager'

export default class EngineDirector {
  createEngine(canvasId: string, gameClientApi: IGameClientApi) {
    const engine = new EngineBuilder()
      .withLogger(new LogManager(LogLevel.DEBUG))
      .withGameClientApi(gameClientApi)
      .withEntityDataManager(new EntityDataManager())
      .withEntityManager(new EntityManager())
      .withGameLoop(new GameLoop())
      .withRenderer(new RendererV2(canvasId))
      .withInput(new InputManager())
      .withCamera(new Camera())
      .withTileMap(new Tilemap())
      .withEntityCreator(new EntityCreator())
      .withPlayerManager(new PlayerManager())
      .build()
    return engine
  }
}
