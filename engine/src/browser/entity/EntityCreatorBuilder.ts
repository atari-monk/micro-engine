import {
  IEntityDependencyListBuilder,
  IEntityManager,
  IInputManager,
  ILogger,
  IObjectDataManager,
  IRendererV2,
  ITilemap,
} from 'engine_api'
import EntityCreator from './EntityCreator'
import { EntityFactoryBuilder } from './EntityFactoryBuilder'

export default class EntityCreatorBuilder {
  private _dependencyBuilder!: IEntityDependencyListBuilder
  private _entityManager!: IEntityManager
  private _objectDataManager!: IObjectDataManager
  private _entityFactoryBuilder: EntityFactoryBuilder =
    new EntityFactoryBuilder()
  private _logger!: ILogger
  private _tileMap!: ITilemap
  private _renderer!: IRendererV2
  private _input!: IInputManager

  withDependencyBuilder(dependencyBuilder: IEntityDependencyListBuilder): this {
    this._dependencyBuilder = dependencyBuilder
    return this
  }

  withEntityManager(entityManager: any): this {
    this._entityManager = entityManager
    return this
  }

  withObjectDataManager(objectDataManager: IObjectDataManager): this {
    this._objectDataManager = objectDataManager
    return this
  }

  withEntityFactoryBuilder(entityFactoryBuilder: EntityFactoryBuilder): this {
    this._entityFactoryBuilder = entityFactoryBuilder
    return this
  }

  withLogger(logger: ILogger): this {
    this._logger = logger
    return this
  }

  withTileMap(tileMap: ITilemap): this {
    this._tileMap = tileMap
    return this
  }

  withRenderer(renderer: IRendererV2): this {
    this._renderer = renderer
    return this
  }

  withInput(input: IInputManager): this {
    this._input = input
    return this
  }

  build(): EntityCreator {
    const entityFactory = this._entityFactoryBuilder
      .withDependencyBuilder(this._dependencyBuilder)
      .build()

    return new EntityCreator(
      this._dependencyBuilder,
      this._entityManager,
      this._objectDataManager,
      entityFactory,
      this._logger,
      this._tileMap,
      this._renderer,
      this._input
    )
  }
}
