import { LogLevel } from 'engine_api'
import LogManager from '../../tech/log_manager/LogManager'
import EngineBuilder from './EngineBuilder'
import GameLoop from '../../tech/game_loop/GameLoop'
import InputManager from '../../tech/input_manager/InputManager'
import EntityManager from '../../tech/entity_component/EntityManager'
import Camera from '../../tech/camera/Camera'
import EntityDataManager from '../entity/EntityDataManager'
import Tilemap from '../../tech/tile_map/Tilemap'
import EntityCreator from '../entity/EntityCreator'
import MapEntityBuilder from '../entity/builder/MapEntitBuilder'
import ObjectEntityBuilder from '../entity/builder/ObjectEntityBuilder'
import SpriteObjectEntityBuilder from '../entity/builder/SpriteObjectEntityBuilder'
import PlayerEntityBuilder from '../entity/builder/PlayerEntityBuilder'
import RendererV2 from '../../tech/renderer/RendererV2'

export default class EngineDirector {
  createEngine(canvasId: string) {
    const engine = new EngineBuilder()
      .withLogger(new LogManager(LogLevel.DEBUG))
      .withGameLoop(new GameLoop())
      .withRenderer(new RendererV2(canvasId))
      .withInput(new InputManager())
      .withEntityDataManager(new EntityDataManager())
      .withEntityManager(new EntityManager())
      .withCamera(new Camera())
      .withTileMap(new Tilemap())
      .withEntityCreator(
        new EntityCreator(),
        new MapEntityBuilder(),
        new ObjectEntityBuilder(),
        new SpriteObjectEntityBuilder(),
        new PlayerEntityBuilder()
      )
      .build()
    return engine
  }
}
