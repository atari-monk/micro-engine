import {
  ICamera,
  IEngineConfig,
  IEntityManager,
  IGameData,
  IGameLoop,
  ILogger,
  IObject,
  IManager,
  IRendererV2,
  LogLevel,
  ISprite,
} from 'engine_api'
import GameLoop from '../../tech/game_loop/GameLoop'
import LogManager from '../../tech/log_manager/LogManager'
import RendererV2 from '../../tech/renderer/RendererV2'
import Engine from './Engine'
import InputManager from '../../tech/input_manager/InputManager'
import ObjectDataManager from '../entity/manager/ObjectDataManager'
import Tilemap from '../../tech/tile_map/Tilemap'
import Camera from '../../tech/camera/Camera'
import EntityManager from '../../tech/entity_component/EntityManager'
import SimpleEntityCreator from '../entity/creator/SimpleEntityCreator'
import SpriteDataManager from '../entity/manager/SpriteDataManager'
import SpriteEntityCreator from '../entity/creator/SpriteEntityCreator'

export default class EngineFactory {
  private readonly _renderer: IRendererV2
  private readonly _input: InputManager = new InputManager()
  private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
  private readonly _objectDataManager: IManager<IObject> =
    new ObjectDataManager()
  private readonly _spriteDataManager: IManager<ISprite> =
    new SpriteDataManager()
  protected readonly _entityManager: IEntityManager = new EntityManager()
  protected _gameLoop: IGameLoop
  private readonly _tileMap: Tilemap
  private _keyDownHandler: (event: KeyboardEvent) => void
  private _keyUpHandler: (event: KeyboardEvent) => void
  protected _engineConfig?: IEngineConfig
  private readonly _camera: ICamera
  private readonly _entityCreator: SimpleEntityCreator
  private readonly _spriteEntityCreator: SpriteEntityCreator

  get renderer(): IRendererV2 {
    return this._renderer
  }

  constructor(canvasId: string) {
    this._entityManager.logger = this._logger
    this._renderer = new RendererV2(canvasId)
    this._tileMap = new Tilemap()
    this._tileMap.renderer = this._renderer
    this._camera = new Camera()
    this._camera.renderer = this._renderer
    this._gameLoop = new GameLoop()
    this._keyDownHandler = (event: KeyboardEvent) => {
      this._input.handleKeyDown(event.key)
    }
    this._keyUpHandler = (event: KeyboardEvent) => {
      this._input.handleKeyUp(event.key)
    }
    this._entityCreator = new SimpleEntityCreator(
      this._entityManager,
      this._objectDataManager
    )
    this._entityCreator.mapEntityBuilder
      .withLogger(this._logger)
      .withTileMap(this._tileMap)
    this._entityCreator.objectEntityBuilder
      .withLogger(this._logger)
      .withRenderer(this._renderer)
    this._entityCreator.playerEntityBuilder
      .withLogger(this._logger)
      .withRenderer(this._renderer)
      .withInputManager(this._input)
    this._spriteEntityCreator = new SpriteEntityCreator(
      this._entityManager,
      this._spriteDataManager
    )
    this._spriteEntityCreator.objectEntityBuilder
      .withLogger(this._logger)
      .withRenderer(this._renderer)
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
    this.loadSpriteData(gameData.spriteData)
    this._entityCreator.createEntities()
    this._spriteEntityCreator.createEntities()
  }

  private createEngineConfig() {
    return {
      gameLoop: this._gameLoop,
      renderer: this._renderer,
      logger: this._logger,
      input: this._input,
      entityManager: this._entityManager,
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

  private loadSpriteData(spriteDataManager: IManager<ISprite>) {
    spriteDataManager.forEach((name, sprite) => {
      this._spriteDataManager.add(name, sprite)
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
    this._entityManager.removeAll()
  }

  private unsubscribeKeyboardEvents(): void {
    document.removeEventListener('keydown', this._keyDownHandler)
    document.removeEventListener('keyup', this._keyUpHandler)
  }
}
