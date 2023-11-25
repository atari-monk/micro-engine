import {
  IAllEntityConfig,
  ICamera,
  IEngineConfig,
  IEntitiesManager,
  IGameData,
  IGameLoop,
  ILogger,
  IObject,
  IObjectDataManager,
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
import Vector2 from '../math/Vector2'
import Camera from '../camera/Camera'

export default class EngineFactory {
  private readonly _renderer: IRendererV2
  private readonly _input: InputManager = new InputManager()
  private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
  private readonly _objectDataManager: IObjectDataManager =
    new ObjectDataManager()
  protected readonly _entityFactory: EntityFactory = new EntityFactory()
  protected readonly _entitiesManager: IEntitiesManager = new EntitiesManager()
  protected _gameLoop: IGameLoop
  private readonly _tileMap: Tilemap
  private _keyDownHandler: (event: KeyboardEvent) => void
  private _keyUpHandler: (event: KeyboardEvent) => void
  private _engineConfig?: IEngineConfig
  private _zeroObj: IObject = this.createZeroObj()
  protected readonly _allEntityConfig: IAllEntityConfig
  private readonly _camera: ICamera

  get renderer(): IRendererV2 {
    return this._renderer
  }

  constructor(canvasId: string) {
    this._renderer = this.getRenderer(canvasId)
    this._tileMap = new Tilemap(this._renderer)
    this._camera = new Camera(this._renderer)
    this._gameLoop = new GameLoop(this._entitiesManager)
    this._allEntityConfig = this.createAllEntityConfig()
    this._keyDownHandler = (event: KeyboardEvent) => {
      this._input.handleKeyDown(event.key)
    }
    this._keyUpHandler = (event: KeyboardEvent) => {
      this._input.handleKeyUp(event.key)
    }
  }

  protected getRenderer(canvasId: string): IRendererV2 {
    return new RendererV2(canvasId)
  }

  private createZeroObj(): IObject {
    return {
      id: '',
      color: 'black',
      position: new Vector2(0, 0),
      size: new Vector2(0, 0),
      speed: new Vector2(0, 0),
    } as IObject
  }

  private createAllEntityConfig() {
    if (!this._zeroObj) throw new Error('ZeroObj dependency must be here!')
    if (!this._renderer) throw new Error('Renderer dependency must be here!')
    if (!this._input) throw new Error('Input dependency must be here!')
    if (!this._logger) throw new Error('Logger dependency must be here!')
    if (!this._tileMap) throw new Error('TileMap dependency must be here!')
    return {
      objectConfig: this._zeroObj,
      renderer: this._renderer,
      input: this._input,
      logger: this._logger,
      tileMap: this._tileMap,
    } as IAllEntityConfig
  }

  protected subscribeKeyboardEvents() {
    document.addEventListener('keydown', this._keyDownHandler)
    document.addEventListener('keyup', this._keyUpHandler)
  }

  protected unsubscribeKeyboardEvents(): void {
    document.removeEventListener('keydown', this._keyDownHandler)
    document.removeEventListener('keyup', this._keyUpHandler)
  }

  private loadObjectData(data: Record<string, IObject>) {
    for (const [key, value] of Object.entries(data)) {
      this._objectDataManager.addObjectData(key, value)
    }
  }

  private createEntities() {
    this.zeroObjectData()
    this.createMap()

    this.setObjectData()
    this.createObject()

    this.setPlayerData()
    this.createPlayer()
  }

  private zeroObjectData() {
    this._allEntityConfig.objectConfig = this._zeroObj
  }

  private createMap() {
    this._entitiesManager.addEntity(
      'map',
      this._entityFactory.createMapEntity(this._allEntityConfig)
    )
  }

  private setObjectData() {
    this._allEntityConfig.objectConfig =
      this._objectDataManager.getObjectData('object')
  }

  private createObject() {
    this._entitiesManager.addEntity(
      'object',
      this._entityFactory.createObjectEntity(this._allEntityConfig)
    )
  }

  private setPlayerData() {
    this._allEntityConfig.objectConfig =
      this._objectDataManager.getObjectData('player')
  }

  protected createPlayer() {
    this._entitiesManager.addEntity(
      'player',
      this._entityFactory.createPlayerEntity(this._allEntityConfig)
    )
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

  createEngine(gameData: IGameData) {
    this.subscribeKeyboardEvents()
    this._camera.load(gameData.tileMapData)
    this._tileMap.load(gameData.tileMapData)
    this.loadObjectData(gameData.objectData.getAllObjectData())
    this.createEntities()
    this._gameLoop.load()
    this._engineConfig = this.createEngineConfig()
    return new Engine(this._engineConfig)
  }

  reloadEngine(gameData: IGameData) {
    this.unsubscribeKeyboardEvents()
    this._input.unsubscribeAll('KeyDown')
    this._objectDataManager.removeAllObjectData()
    this._entitiesManager.removeAllEntities()

    this.subscribeKeyboardEvents()
    this._camera.load(gameData.tileMapData)
    this._tileMap.load(gameData.tileMapData)
    this.loadObjectData(gameData.objectData.getAllObjectData())
    this.createEntities()
    this._gameLoop.load()
  }
}
