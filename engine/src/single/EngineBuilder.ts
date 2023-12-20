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
} from 'engine_api'
import Engine from './Engine'
import EntityBuilder from '../tech/entity/EntityBuilder'
import MapEntity from '../tech/entity/MapEntity'
import ObjectEntity from '../tech/entity/ObjectEntity'
import PlayerEntity from '../tech/entity/PlayerEntity'

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
    const mapEntityBuilder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
      .withEntity(new MapEntity())
      .withLogger(this._logger)
      .withMapComponent(this._tileMap)

    entityCreator.addBuilder('map', mapEntityBuilder)

    const objectEntityBuilder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
      .withEntity(new ObjectEntity())
      .withLogger(this._logger)
      .withRenderer(this._renderer)

    objectEntityBuilder
      .recordOperation((dataKey) =>
        objectEntityBuilder.withEntityData(dataKey!)
      )
      .recordOperation(() => objectEntityBuilder.withObjectComponent())
      .recordOperation(() => objectEntityBuilder.withRenderComponent())

    entityCreator.addBuilder('object', objectEntityBuilder)

    const spriteObjectEntityBuilder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
      .withEntity(new ObjectEntity())
      .withLogger(this._logger)
      .withRenderer(this._renderer)

    spriteObjectEntityBuilder
      .recordOperation((dataKey) =>
        spriteObjectEntityBuilder.withEntityData(dataKey!)
      )
      .recordOperation(() => spriteObjectEntityBuilder.withObjectComponent())
      .recordOperation(() => spriteObjectEntityBuilder.withSpriteComponent())

    entityCreator.addBuilder('spriteObject', spriteObjectEntityBuilder)

    const playerEntityBuilder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
      .withEntity(new PlayerEntity())
      .withLogger(this._logger)
      .withRenderer(this._renderer)

    playerEntityBuilder
      .recordOperation((dataKey) =>
        playerEntityBuilder.withEntityData(dataKey!)
      )
      .recordOperation(() => playerEntityBuilder.withObjectComponent())
      .recordOperation(() => playerEntityBuilder.withRenderComponent())
    this.addPlayerMovementComponent(playerEntityBuilder)

    entityCreator.addBuilder('player', playerEntityBuilder)

    this._entityCreator = entityCreator
    return this
  }

  addPlayerMovementComponent(playerEntityBuilder: EntityBuilder) {
    playerEntityBuilder.recordOperation(() =>
      playerEntityBuilder.withMovementComponent(this._input)
    )
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
