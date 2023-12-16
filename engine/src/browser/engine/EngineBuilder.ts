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
} from 'engine_api'
import Engine from './Engine'
import IEntityCreatorWithBuilders from '../entity/IEntityCreatorWithBuilders'
import {
  IMapEntityBuilder,
  IObjectEntityBuilder,
  IPlayerEntityBuilder,
  ISpriteObjectEntityBuilder,
} from '../entity/builder/EntityBuilderAPI'

export default class EngineBuilder {
  private _logger!: ILogger
  private _gameLoop!: IGameLoop
  private _renderer!: IRendererV2
  private _input!: IInputManager
  private _entityDataManager!: IManager<IEntityDataModel>
  private _entityManager!: IEntityManager
  private _camera!: ICamera
  private _tileMap!: ITileMap
  private _entityCreator!: IEntityCreatorWithBuilders

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

  withEntityCreator(
    entityCreator: IEntityCreatorWithBuilders,
    mapEntityBuilder: IMapEntityBuilder,
    objectEntityBuilder: IObjectEntityBuilder,
    spriteObjectEntityBuilder: ISpriteObjectEntityBuilder,
    playerEntityBuilder: IPlayerEntityBuilder
  ) {
    if (!this._entityDataManager) {
      throw new Error(this.getError('Entity Data Manager', 'Entity Creator'))
    }
    if (!this._entityManager) {
      throw new Error(this.getError('Entity Manager', 'Entity Creator'))
    }
    this._entityCreator = entityCreator
    this._entityCreator.dataManager = this._entityDataManager
    this._entityCreator.entityManager = this._entityManager
    this._entityCreator.mapEntityBuilder = mapEntityBuilder
      .withLogger(this._logger)
      .withTileMap(this._tileMap)
    this._entityCreator.objectEntityBuilder = objectEntityBuilder
      .withLogger(this._logger)
      .withRenderer(this._renderer)
    this._entityCreator.spriteObjectEntityBuilder = spriteObjectEntityBuilder
      .withLogger(this._logger)
      .withRenderer(this._renderer)
    this._entityCreator.playerEntityBuilder = playerEntityBuilder
      .withLogger(this._logger)
      .withRenderer(this._renderer)
      .withInputManager(this._input)
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
      !this._entityCreator
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
      this._entityCreator
    )
  }
}
