import {
  ICamera,
  IEntityManager,
  IGameClientApi,
  IGameData,
  ILogger,
  IObject,
  IObjectDataManager,
  IRendererV2,
  LogLevel,
} from 'engine_api'
import {
  IClientEngineConfig as IEngineConfig,
  IClientPlayerManager as IPlayerManager,
} from 'engine_api/client'
import { GameLoop } from '../game_loop/GameLoop'
import EntityFactory from '../../browser/entity/EntityFactory'
import ObjectDataManager from '../../browser/entity/ObjectDataManager'
import InputManager from '../../tech/input_manager/InputManager'
import LogManager from '../../tech/log_manager/LogManager'
import Tilemap from '../../tech/tile_map/Tilemap'
import RendererV2 from '../../tech/renderer/RendererV2'
import Camera from '../../tech/camera/Camera'
import PlayerEntity from '../entity/PlayerEntity'
import Engine from './Engine'
import PlayerManager from '../entity/PlayerManager'
import EntityManager2 from '../../tech/entity_component/EntityManager2'

export default class ClientEngineFactory {
  private readonly _renderer: IRendererV2
  private readonly _input: InputManager = new InputManager()
  private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
  private readonly _objectDataManager: IObjectDataManager =
    new ObjectDataManager()
  private readonly _entityFactory: EntityFactory = new EntityFactory()
  private readonly _entityManager: IEntityManager = new EntityManager2(
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
    this.loadObjectData(gameData.objectData.getAllObjectData())
    this.createEntities()
    //this._gameLoop.load()
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

  private loadObjectData(data: Record<string, IObject>) {
    for (const [key, value] of Object.entries(data)) {
      this._objectDataManager.addObjectData(key, value)
    }
  }

  private createEntities() {
    this._entityFactory.setMapEntityBuilderDependencyList(
      this._logger,
      this._tileMap
    )
    this._entityManager.addEntity('map', this._entityFactory.createMapEntity())

    this._entityFactory.setObjectEntityBuilderDependencyList(
      this._logger,
      this._objectDataManager.getObjectData('object'),
      this._renderer
    )
    this._entityManager.addEntity(
      'object',
      this._entityFactory.createObjectEntity()
    )

    const player1 = new PlayerEntity(
      this._logger,
      this._objectDataManager.getObjectData('player1'),
      this._renderer,
      this._input
    )
    const player2 = new PlayerEntity(
      this._logger,
      this._objectDataManager.getObjectData('player2'),
      this._renderer,
      this._input
    )
    this._entityManager.addEntity('player1', player1)
    this._entityManager.addEntity('player2', player2)
  }

  reloadEngine(gameData: IGameData) {
    this.resetEngine()
    this.InitializeEngine(gameData)
  }

  private resetEngine() {
    this.unsubscribeKeyboardEvents()
    this._input.unsubscribeAll('KeyDown')
    this._objectDataManager.removeAllObjectData()
    this._entityManager.removeAllEntities()
  }

  private unsubscribeKeyboardEvents(): void {
    document.removeEventListener('keydown', this._keyDownHandler)
    document.removeEventListener('keyup', this._keyUpHandler)
  }
}
