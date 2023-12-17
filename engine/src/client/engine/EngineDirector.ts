import { LogLevel } from 'engine_api'
import LogManager from '../../tech/log_manager/LogManager'
import GameLoop from '../../tech/game_loop/GameLoop'
import InputManager from '../../tech/input_manager/InputManager'
import EntityManager from '../../tech/entity_component/EntityManager'
import Camera from '../../tech/camera/Camera'
import Tilemap from '../../tech/tile_map/Tilemap'
import RendererV2 from '../../tech/renderer/RendererV2'
import EntityDataManager from '../../browser/entity/EntityDataManager'
import MapEntityBuilder from '../../browser/entity/builder/MapEntitBuilder'
import ObjectEntityBuilder from '../../browser/entity/builder/ObjectEntityBuilder'
import SpriteObjectEntityBuilder from '../../browser/entity/builder/SpriteObjectEntityBuilder'
import EngineBuilder from './EngineBuilder'
import PlayerEntityBuilder from '../entity/builder/PlayerEntityBuilder'
import PlayerManager from '../entity/PlayerManager'
import EntityCreator from '../entity/EntityCreator'

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
      .withPlayerManager(new PlayerManager())
      .build()
    return engine
  }
}
