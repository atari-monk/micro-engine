import { LogLevel } from 'engine_api'
import LogManager from '../tech/log_manager/LogManager'
import EngineBuilder from './EngineBuilder'
import GameLoop from '../tech/game_loop/GameLoop'
import InputManager from '../tech/input_manager/InputManager'
import EntityManager from '../tech/entity_component/EntityManager'
import Camera from '../tech/camera/Camera'
import EntityDataManager from '../tech/entity/EntityDataManager'
import Tilemap from '../tech/tile_map/Tilemap'
import RendererV2 from '../tech/renderer/RendererV2'
import EntityCreator from '../tech/entity/creator/EntityCreator'
import CenterCollisionDetector from '../tech/collision_detector/CenterCollisionDetector'
import CollisionManager from '../tech/collision_detector/CollisionManager'

export default class EngineDirector {
  createDefaultEngineBuilder(canvasId: string) {
    return new EngineBuilder()
      .withLogger(new LogManager(LogLevel.DEBUG))
      .withGameLoop(new GameLoop())
      .withRenderer(new RendererV2(canvasId))
      .withInput(new InputManager())
      .withEntityDataManager(new EntityDataManager())
      .withEntityManager(new EntityManager())
      .withCamera(new Camera())
      .withTileMap(new Tilemap())
      .withEngineConfigOptions()
      .withCollisionManager(new CollisionManager(new CenterCollisionDetector()))
      .withEntityCreator(new EntityCreator())
  }
}
