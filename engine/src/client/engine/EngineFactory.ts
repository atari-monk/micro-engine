import {
  ICamera,
  IEngineConfig,
  IEntitiesManager,
  IGameClientApi,
  IGameData,
  ILogger,
  IObject,
  IObjectDataManager,
  IRendererV2,
  LogLevel,
} from 'engine_api'
import { GameLoop } from '../game_loop/GameLoop'
import EntityFactory from '../../browser/entity/EntityFactory'
import ObjectDataManager from '../../browser/entity/ObjectDataManager'
import EntitiesManager from '../../tech/entity_component/EntitiesManager'
import InputManager from '../../tech/input_manager/InputManager'
import LogManager from '../../tech/log_manager/LogManager'
import Tilemap from '../../tech/tile_map/Tilemap'
import RendererV2 from '../../tech/renderer/RendererV2'
import Camera from '../../tech/camera/Camera'
import PlayerEntity from '../entity/PlayerEntity'
import Engine from './Engine'

export default class ClientEngineFactory {
  private readonly _renderer: IRendererV2
  private readonly _input: InputManager = new InputManager()
  private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
  private readonly _objectDataManager: IObjectDataManager =
    new ObjectDataManager()
  protected readonly _entityFactory: EntityFactory = new EntityFactory()
  protected readonly _entitiesManager: IEntitiesManager = new EntitiesManager()
  protected _gameLoop: GameLoop
  private readonly _tileMap: Tilemap
  private _keyDownHandler: (event: KeyboardEvent) => void
  private _keyUpHandler: (event: KeyboardEvent) => void
  protected _engineConfig?: IEngineConfig
  private readonly _camera: ICamera

  get renderer(): IRendererV2 {
    return this._renderer
  }

  constructor(canvasId: string, private readonly _clientApi: IGameClientApi) {
    this._renderer = new RendererV2(canvasId)
    this._tileMap = new Tilemap(this._renderer)
    this._camera = new Camera(this._renderer)
    this._gameLoop = new GameLoop(this._entitiesManager, this._clientApi)
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
    this._gameLoop.load()
  }

  private createEngineConfig() {
    return {
      gameLoop: this._gameLoop,
      renderer: this._renderer,
      logger: this._logger,
      input: this._input,
      entitiesManager: this._entitiesManager,
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
    this.createMap()
    this.createObject()
    this.createPlayers()
  }

  private createMap() {
    this._entitiesManager.addEntity(
      'map',
      this._entityFactory.createMapEntity(this._tileMap)
    )
  }

  private createObject() {
    this._entitiesManager.addEntity(
      'object',
      this._entityFactory.createObjectEntity(
        this._objectDataManager.getObjectData('object'),
        this._renderer
      )
    )
  }

  private createPlayers() {
    this._entitiesManager.addEntity(
      'player1',
      new PlayerEntity(
        this._objectDataManager.getObjectData('player1'),
        this._renderer,
        this._input,
        this._logger
      )
    )
    this._entitiesManager.addEntity(
      'player2',
      new PlayerEntity(
        this._objectDataManager.getObjectData('player2'),
        this._renderer,
        this._input,
        this._logger
      )
    )
  }

  reloadEngine(gameData: IGameData) {
    this.resetEngine()
    this.InitializeEngine(gameData)
  }

  private resetEngine() {
    this.unsubscribeKeyboardEvents()
    this._input.unsubscribeAll('KeyDown')
    this._objectDataManager.removeAllObjectData()
    this._entitiesManager.removeAllEntities()
  }

  private unsubscribeKeyboardEvents(): void {
    document.removeEventListener('keydown', this._keyDownHandler)
    document.removeEventListener('keyup', this._keyUpHandler)
  }
}
