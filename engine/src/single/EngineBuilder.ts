import {
  ICamera,
  IEntityManager,
  IGameLoop,
  IInputManager,
  ILogger,
  IManager,
  IRendererV2,
  IEntityDataModel,
  ITileMap,
  IEntityCreator,
  IConfigurationManager,
  IEventSystem,
} from 'engine_api'
import Engine from './Engine'
import IEngineConfigOptions from '../tech/config_manager/IEngineConfigOptions'
import ConfigManager from '../tech/config_manager/ConfigManager'
import CollisionManager from '../tech/collision_detector/CollisionManager'
import ICustomEntityBuilder from '../tech/entity/builder/ICustomEntityBuilder'
import { BuilderLibrary } from '../tech/entity/builder/BuilderLibrary'
import BuilderFactory from '../tech/entity/builder/BuilderFactory'

export default class EngineBuilder {
  protected _logger!: ILogger
  protected _gameLoop!: IGameLoop
  protected _renderer!: IRendererV2
  protected _input!: IInputManager
  protected _entityDataManager!: IManager<IEntityDataModel>
  protected _entityManager!: IEntityManager
  protected _camera!: ICamera
  protected _tileMap!: ITileMap
  protected _entityCreator!: IEntityCreator
  protected _configManager!: IConfigurationManager<IEngineConfigOptions>
  protected _collisionManager!: CollisionManager
  protected _eventSystem!: IEventSystem

  withLogger(logger: ILogger) {
    this._logger = logger
    return this
  }

  withGameLoop(gameLoop: IGameLoop) {
    this._gameLoop = gameLoop
    return this
  }

  withRenderer(renderer: IRendererV2) {
    this._renderer = renderer
    return this
  }

  withInput(input: IInputManager) {
    this._input = input
    return this
  }

  withEntityDataManager(entityDataManager: IManager<IEntityDataModel>) {
    this._entityDataManager = entityDataManager
    return this
  }

  getError(childName: string, parentName: string) {
    return `${childName} must be set before setting the ${parentName}`
  }

  withEntityManager(entityManager: IEntityManager) {
    if (!this._logger) {
      throw new Error(this.getError('Logger', 'Entity Manager'))
    }
    this._entityManager = entityManager
    this._entityManager.logger = this._logger
    return this
  }

  withCamera(camera: ICamera) {
    if (!this._renderer) {
      throw new Error(this.getError('Renderer', 'Camera'))
    }
    this._camera = camera
    this._camera.renderer = this._renderer
    return this
  }

  withTileMap(tileMap: ITileMap) {
    if (!this._renderer) {
      throw new Error(this.getError('Renderer', 'Tile Map'))
    }
    this._tileMap = tileMap
    this._tileMap.renderer = this._renderer
    return this
  }

  withEntityCreator(entityCreator: IEntityCreator) {
    this._entityCreator = entityCreator
    return this
  }

  withCustomBuilder(builderKey: string, builder: ICustomEntityBuilder) {
    builder.withEntityBuilder(builderKey)
  }

  withBuilderFromLibrary(builderKey: string, builderType: BuilderLibrary) {
    const builder = new BuilderFactory(
      this._entityCreator,
      this._entityDataManager,
      this._entityManager,
      this._logger,
      this._tileMap,
      this._renderer,
      this._collisionManager,
      this._input,
      this._eventSystem
    ).createBuilder(builderType)
    builder.withEntityBuilder(builderKey)
  }

  withEngineConfigOptions() {
    const initialConfig: IEngineConfigOptions = {
      enableCamera: true,
    }
    this._configManager = new ConfigManager<IEngineConfigOptions>(initialConfig)
    return this
  }

  withCollisionManager(collisionManager: CollisionManager) {
    this._collisionManager = collisionManager
    return this
  }

  withEventSystem(eventSystem: IEventSystem) {
    this._eventSystem = eventSystem
    return this
  }

  build() {
    if (
      !this._logger ||
      !this._gameLoop ||
      !this._renderer ||
      !this._input ||
      !this._entityDataManager ||
      !this._entityManager ||
      !this._camera ||
      !this._tileMap ||
      !this._entityCreator ||
      !this._configManager ||
      !this._collisionManager ||
      !this._eventSystem
    ) {
      throw new Error(
        'All dependencies must be set before building the engine.'
      )
    }
    return new Engine(
      this._logger,
      this._gameLoop,
      this._renderer,
      this._input,
      this._entityDataManager,
      this._entityManager,
      this._camera,
      this._tileMap,
      this._entityCreator,
      this._configManager,
      this._collisionManager,
      this._eventSystem
    )
  }
}
