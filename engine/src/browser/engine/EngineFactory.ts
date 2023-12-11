import {
  ICamera,
  IEngineConfig,
  IEntityDependencyListBuilder,
  IEntityManager,
  IGameData,
  IGameLoop,
  ILogger,
  IObject,
  IManager,
  IRendererV2,
  LogLevel,
} from 'engine_api'
import GameLoop from '../../tech/game_loop/GameLoop'
import LogManager from '../../tech/log_manager/LogManager'
import RendererV2 from '../../tech/renderer/RendererV2'
import Engine from './Engine'
import InputManager from '../../tech/input_manager/InputManager'
import EntityFactory from '../entity/builder/EntityFactory'
import ObjectDataManager from '../entity/ObjectDataManager'
import Tilemap from '../../tech/tile_map/Tilemap'
import Camera from '../../tech/camera/Camera'
import EntityManager from '../../tech/entity_component/EntityManager'
import { EntityDependencyListBuilder } from '../entity/builder/EntityDependencyListBuilder'
import EntityCreatorBuilder from '../entity/creator/EntityCreatorBuilder'
import BasicEntityCreator from '../entity/creator/BasicEntityCreator'

export default class EngineFactory {
  private readonly _renderer: IRendererV2
  private readonly _input: InputManager = new InputManager()
  private readonly _logger: ILogger = new LogManager(LogLevel.INFO)
  private readonly _objectDataManager: IManager<IObject> =
    new ObjectDataManager()
  protected readonly _dependencyBuilder: IEntityDependencyListBuilder =
    new EntityDependencyListBuilder()
  protected readonly _entityFactory: EntityFactory = new EntityFactory(
    this._dependencyBuilder
  )
  protected readonly _entityManager: IEntityManager = new EntityManager(
    this._logger
  )
  protected _gameLoop: IGameLoop
  private readonly _tileMap: Tilemap
  private _keyDownHandler: (event: KeyboardEvent) => void
  private _keyUpHandler: (event: KeyboardEvent) => void
  protected _engineConfig?: IEngineConfig
  private readonly _camera: ICamera
  private readonly _entityCreator: BasicEntityCreator

  get renderer(): IRendererV2 {
    return this._renderer
  }

  constructor(canvasId: string) {
    this._renderer = new RendererV2(canvasId)
    this._tileMap = new Tilemap(this._renderer)
    this._camera = new Camera(this._renderer)
    this._gameLoop = new GameLoop(this._entityManager)
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
    this._entityManager.removeAll()
  }

  private unsubscribeKeyboardEvents(): void {
    document.removeEventListener('keydown', this._keyDownHandler)
    document.removeEventListener('keyup', this._keyUpHandler)
  }
}
