import { IRendererV2, LogLevel } from 'engine_api'
import LogManager from '../../tech/log_manager/LogManager'
import EngineBuilder from './EngineBuilder'
import GameLoop from '../../tech/game_loop/GameLoop'
import InputManager from '../../tech/input_manager/InputManager'
import EntityManager from '../../tech/entity_component/EntityManager'
import Camera from '../../tech/camera/Camera'
import EntityDataManager from '../entity/EntityDataManager'
import Tilemap from '../../tech/tile_map/Tilemap'
import EntityCreator from '../entity/EntityCreator'

export default class EngineDirector {
  createEngine(renderer: IRendererV2) {
    const engine = new EngineBuilder()
      .withLogger(new LogManager(LogLevel.DEBUG))
      .withGameLoop(new GameLoop())
      .withRenderer(renderer)
      .withInput(new InputManager())
      .withEntityDataManager(new EntityDataManager())
      .withEntityManager(new EntityManager())
      .withCamera(new Camera())
      .withTileMap(new Tilemap())
      .withEntityCreator(new EntityCreator())
      .build()
    return engine
  }
}
