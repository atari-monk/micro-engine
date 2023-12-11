import {
  ICamera,
  IEntityDependencyListBuilder,
  IEntityManager,
  IGameClientApi,
  IGameData,
  ILogger,
  IObject,
  IManager,
  IRendererV2,
  LogLevel,
} from 'engine_api'
import {
  IClientEngineConfig as IEngineConfig,
  IClientPlayerManager as IPlayerManager,
} from 'engine_api/client'
import { GameLoop } from '../game_loop/GameLoop'
import EntityFactory from '../../browser/entity/builder/EntityFactory'
import ObjectDataManagerOnMap from '../../browser/entity/ObjectDataManagerOnMap'
import InputManager from '../../tech/input_manager/InputManager'
import LogManager from '../../tech/log_manager/LogManager'
import Tilemap from '../../tech/tile_map/Tilemap'
import RendererV2 from '../../tech/renderer/RendererV2'
import Camera from '../../tech/camera/Camera'
import Engine from './Engine'
import PlayerManager from '../entity/PlayerManager'
import MapEntityManager from '../../tech/entity_component/MapEntityManager'
import { EntityDependencyListBuilder } from '../../browser/entity/builder/EntityDependencyListBuilder'
import EntityCreator from '../entity/EntityCreator'
import EntityCreatorBuilder from '../entity/EntityCreatorBuilder'

export default class EngineFactory {
  private readonly _renderer: IRendererV2
  private readonly _input: InputManager = new InputManager()
  private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
  private readonly _objectDataManager: IManager<IObject> =
    new ObjectDataManagerOnMap()
  protected readonly _dependencyBuilder: IEntityDependencyListBuilder =
    new EntityDependencyListBuilder()
  private readonly _entityFactory: EntityFactory = new EntityFactory(
    this._dependencyBuilder
  )
  private readonly _entityManager: IEntityManager = new MapEntityManager(
    this._logger
  )
  private readonly _playerManager: IPlayerManager = new PlayerManager(
    this._logger,
    this._entityManager
  )
  private _gameLoop: GameLoop
  private readonly _tileMap: Tilemap
  private _keyDownHandler: (event: KeyboardEvent) => void
  private _keyUpHandler: (event: KeyboardEvent) => void
  private _engineConfig?: IEngineConfig
  private readonly _camera: ICamera
  private readonly _entityCreator: EntityCreator

  get renderer(): IRendererV2 {
    return this._renderer
  }

  constructor(canvasId: string, private readonly _clientApi: IGameClientApi) {
    this._renderer = new RendererV2(canvasId)
    this._tileMap = new Tilemap(this._renderer)
    this._camera = new Camera(this._renderer)
    this._gameLoop = new GameLoop(this._entityManager, this._clientApi)
    this._keyDownHandler = (event: KeyboardEvent) => {
      this._input.handleKeyDown(event.key)
    }
    this._keyUpHandler = (event: KeyboardEvent) => {
      this._input.handleKeyUp(event.key)
    }
    this._entityCreator = new EntityCreatorBuilder()
      .withDependencyBuilder(this._dependencyBuilder)
      .withEntityManager(this._entityManager)
      .withObjectDataManager(this._objectDataManager)
      .withLogger(this._logger)
      .withTileMap(this._tileMap)
      .withRenderer(this._renderer)
      .withInput(this._input)
      .build()
  }

  createEngine(gameData: IGameData) {
    this.InitializeEngine(gameData)
    this._engineConfig = this.createEngineConfig()
    return new Engine(this._engineConfig!)
  }

  private InitializeEngine(gameData: IGameData) {
    this.subscribeKeyboardEvents()
    this._camera.load(gameData.tileMapData)
    this._tileMap.load(gameData.tileMapData)
    this.loadObjectData(gameData.objectData)
    this._entityCreator.createEntities()
  }

  private createEngineConfig() {
    return {
      gameLoop: this._gameLoop,
      renderer: this._renderer,
      logger: this._logger,
      input: this._input,
      entityManager: this._entityManager,
      playerManager: this._playerManager,
      camera: this._camera,
    } as IEngineConfig
  }

  private subscribeKeyboardEvents() {
    document.addEventListener('keydown', this._keyDownHandler)
    document.addEventListener('keyup', this._keyUpHandler)
  }

  private loadObjectData(objectDataManager: IManager<IObject>) {
    objectDataManager.forEach((name, object) => {
      this._objectDataManager.add(name, object)
    })
  }

  reloadEngine(gameData: IGameData) {
    this.resetEngine()
    this.InitializeEngine(gameData)
  }

  private resetEngine() {
    this.unsubscribeKeyboardEvents()
    this._input.unsubscribeAll('KeyDown')
    this._objectDataManager.removeAll()
    this._entityManager.removeAllEntities()
  }

  private unsubscribeKeyboardEvents(): void {
    document.removeEventListener('keydown', this._keyDownHandler)
    document.removeEventListener('keyup', this._keyUpHandler)
  }
}
