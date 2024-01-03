import { IGameClientApi, LogLevel } from 'engine_api'
import LogManager from '../tech/log_manager/LogManager'
import InputManager from '../tech/input_manager/InputManager'
import EntityManager from '../tech/entity_component/EntityManager'
import Camera from '../tech/camera/Camera'
import Tilemap from '../tech/tile_map/Tilemap'
import RendererV2 from '../tech/renderer/RendererV2'
import EntityDataManager from '../tech/entity/EntityDataManager'
import GameLoop from './GameLoop'
import PlayerManager from './PlayerManager'
import EngineBuilder from './EngineBuilder'
import EntityCreator from '../tech/entity/creator/EntityCreator'
import CenterCollisionDetector from '../tech/collision_detector/CenterCollisionDetector'
import CollisionManager from '../tech/collision_detector/CollisionManager'
import EventSystem from '../tech/event_system/EventSystem'
import InitLogicSystemManager from '../tech/entity_component_system/system/init_logic/InitLogicSystemManager'
import LogicSystemManager from '../tech/entity_component_system/system/logic/LogicSystemManager'
import RenderSystemManager from '../tech/entity_component_system/system/render/RenderSystemManager'

export default class EngineDirector {
  createEngine(canvasId: string, gameClientApi: IGameClientApi) {
    return new EngineBuilder()
      .withLogger(new LogManager(LogLevel.DEBUG))
      .withGameClientApi(gameClientApi)
      .withEntityDataManager(new EntityDataManager())
      .withEntityManager(new EntityManager())
      .withClientGameLoop(new GameLoop())
      .withRenderer(new RendererV2(canvasId))
      .withInput(new InputManager())
      .withCamera(new Camera())
      .withTileMap(new Tilemap())
      .withEngineConfigOptions()
      .withCollisionManager(new CollisionManager(new CenterCollisionDetector()))
      .withEntityCreator(new EntityCreator())
      .withEventSystem(new EventSystem())
      .withLogicSystemManager(new LogicSystemManager())
      .withInitLogicSystemManeger(new InitLogicSystemManager())
      .withRenderSystemManager(new RenderSystemManager())
      .withPlayerManager(new PlayerManager())
      .buildClientEngine()
  }
}
