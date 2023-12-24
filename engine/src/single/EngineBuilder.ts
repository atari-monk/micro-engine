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
  ICollisionDetector,
} from 'engine_api'
import Engine from './Engine'
import EntityBuilder from '../tech/entity/EntityBuilder'
import MapEntity from '../tech/entity/MapEntity'
import ObjectEntity from '../tech/entity/ObjectEntity'
import PlayerEntity from '../tech/entity/PlayerEntity'
import IEngineConfigOptions from '../tech/config_manager/IEngineConfigOptions'
import ConfigManager from '../tech/config_manager/ConfigManager'

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
  protected _collisionDetector!: ICollisionDetector

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
    this.withMapEntityBuilder(entityCreator)
    this.withObjectEntityBuilder(entityCreator)
    this.withSpriteObjectEntityBuilder(entityCreator)
    this.withPlayerEntityBuilder(entityCreator)
    this._entityCreator = entityCreator
    return this
  }

  protected withMapEntityBuilder(entityCreator: IEntityCreator) {
    const builder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
    builder.recordOperation(() => {
      builder
        .withEntity(() => new MapEntity())
        .withLogger(this._logger)
        .withMapComponent(this._tileMap)
    })
    entityCreator.addBuilder('map', builder)
  }

  protected withObjectEntityBuilder(entityCreator: IEntityCreator) {
    const builder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
    builder.recordOperation((dataKey) => {
      builder
        .withEntity(() => new ObjectEntity())
        .withLogger(this._logger)
        .withRenderer(this._renderer)
        .withEntityData(dataKey!)
        .withObjectComponent()
        .withRenderComponent()
    })
    entityCreator.addBuilder('object', builder)
  }

  protected withSpriteObjectEntityBuilder(entityCreator: IEntityCreator) {
    const builder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
    builder.recordOperation((dataKey) =>
      builder
        .withEntity(() => new ObjectEntity())
        .withLogger(this._logger)
        .withRenderer(this._renderer)
        .withEntityData(dataKey!)
        .withObjectComponent()
        .withRenderComponent()
        .withSpriteComponent()
        .withStateComponent()
    )
    entityCreator.addBuilder('spriteObject', builder)
  }

  protected withPlayerEntityBuilder(entityCreator: IEntityCreator) {
    const builder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
    builder.recordOperation((dataKey) =>
      builder
        .withEntity(() => new PlayerEntity())
        .withLogger(this._logger)
        .withRenderer(this._renderer)
        .withCollisionDetector(this._collisionDetector)
        .withEntityData(dataKey!)
        .withObjectComponent()
        .withRenderComponent()
        .withSpriteComponent()
        .withStateComponent()
        .withCollisionComponent()
    )
    this.withPlayerMovementComponent(builder)
    entityCreator.addBuilder('player', builder)
  }

  protected withPlayerMovementComponent(builder: EntityBuilder) {
    builder.recordOperation(() => builder.withMovementComponent(this._input))
  }

  withEngineConfigOptions() {
    const initialConfig: IEngineConfigOptions = {
      enableCamera: true,
    }
    this._configManager = new ConfigManager<IEngineConfigOptions>(initialConfig)
    return this
  }

  withCollisionDetector(collisionDetector: ICollisionDetector) {
    this._collisionDetector = collisionDetector
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
      !this._collisionDetector
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
      this._collisionDetector
    )
  }
}
