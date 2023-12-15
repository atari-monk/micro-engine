import {
  ICamera,
  IEntityCreator,
  IEntityManager,
  IGameLoop,
  IInputManager,
  ILogger,
  IManager,
  IRendererV2,
  ISprite,
  ITileMap,
} from 'engine_api'
import Engine2 from './Engine2'
import EntityCreator from '../entity/creator/EntityCreator'

export default class EngineBuilder {
  private _logger!: ILogger
  private _gameLoop!: IGameLoop
  private _renderer!: IRendererV2
  private _input!: IInputManager
  private _entityDataManager!: IManager<ISprite>
  private _entityManager!: IEntityManager
  private _camera!: ICamera
  private _tileMap!: ITileMap
  private _entityCreator!: IEntityCreator

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

  withEntityDataManager(entityDataManager: IManager<ISprite>) {
    this._entityDataManager = entityDataManager
    return this
  }

  withEntityManager(entityManager: IEntityManager) {
    this._entityManager = entityManager
    return this
  }

  withCamera(camera: ICamera) {
    this._camera = camera
    return this
  }

  withTileMap(tileMap: ITileMap) {
    this._tileMap = tileMap
    return this
  }

  withEntityCreator(entityCreator: IEntityCreator) {
    this._entityCreator = entityCreator
    return this
  }

  build() {
    this._entityManager.logger = this._logger
    this._camera.renderer = this._renderer
    this._tileMap.renderer = this._renderer
    this._entityCreator.dataManager = this._entityDataManager
    this._entityCreator.entityManager = this._entityManager
    const creator = this._entityCreator as EntityCreator
    creator.mapEntityBuilder.withLogger(this._logger).withTileMap(this._tileMap)
    creator.objectEntityBuilder
      .withLogger(this._logger)
      .withRenderer(this._renderer)
    creator.spriteObjectEntityBuilder
      .withLogger(this._logger)
      .withRenderer(this._renderer)
    creator.playerEntityBuilder
      .withLogger(this._logger)
      .withRenderer(this._renderer)
      .withInputManager(this._input)
    return new Engine2(
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
