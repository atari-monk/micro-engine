import {
  IAllEntityConfig,
  IEngineConfig,
  IEntitiesManager,
  IGameLoop,
  ILogger,
  IObjectDataManager,
  IRenderable,
  IRendererV2,
  LogLevel,
} from 'engine_api'
import GameLoop from '../game_loop/GameLoop'
import LogManager from '../log_manager/LogManager'
import RendererV2 from '../renderer/RendererV2'
import Engine from './Engine'
import InputManager from '../input_manager/InputManager'
import EntityFactory from '../entity/EntityFactory'
import EntitiesManager from '../entity_component/EntitiesManager'
import ObjectDataManager from '../entity/ObjectDataManager'
import Tilemap from '../tile_map/Tilemap'
import IGameData from './IGameData'

export default class EngineFactory {
  private readonly _gameLoop: IGameLoop
  private readonly _renderer: IRendererV2
  private readonly _input: InputManager
  private readonly _logger: ILogger
  private readonly _objectDataManager: IObjectDataManager
  private readonly _entityFactory: EntityFactory
  private readonly _entitiesManager: IEntitiesManager
  private readonly _tileMap: IRenderable

  constructor(canvasId: string, private readonly _gameData: IGameData) {
    this._gameLoop = new GameLoop()
    this._renderer = new RendererV2(canvasId)
    this._input = new InputManager()
    document.addEventListener('keydown', (event) => {
      this._input.handleKeyDown(event.key)
    })
    this._logger = new LogManager(LogLevel.INFO)
    this._objectDataManager = new ObjectDataManager()

    const data = this._gameData.objectData.getAllObjectData()
    for (const [key, value] of Object.entries(data)) {
      this._objectDataManager.addObjectData(key, value)
    }
    this._tileMap = new Tilemap(this._gameData.tileMapData, this._renderer)

    const defaultAllEntityConfig: IAllEntityConfig = {
      objectConfig: this._objectDataManager.getObjectData('player'),
      renderer: this._renderer,
      input: this._input,
      logger: this._logger,
      tileMap: this._tileMap,
    }
    this._entityFactory = new EntityFactory(defaultAllEntityConfig)
    this._entitiesManager = new EntitiesManager()
    this._entitiesManager.addEntity(
      'map',
      this._entityFactory.createMapEntity()
    )
    this._entitiesManager.addEntity(
      'object',
      this._entityFactory.createObjectEntity(
        this._objectDataManager.getObjectData('object')
      )
    )
    this._entitiesManager.addEntity(
      'player',
      this._entityFactory.createPlayerEntity(
        this._objectDataManager.getObjectData('player')
      )
    )
  }

  createEngineConfig() {
    const engineConfig: IEngineConfig = {
      gameLoop: this._gameLoop,
      renderer: this._renderer,
      logger: this._logger,
      input: this._input,
      entitiesManager: this._entitiesManager,
    }
    return engineConfig
  }

  createEngine() {
    return new Engine(this.createEngineConfig())
  }
}
