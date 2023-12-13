import {
  IEntityDependencyListBuilder,
  IEntityManager,
  IInputManager,
  ILogger,
  IManager,
  IObject,
  IRendererV2,
  ITilemap,
} from 'engine_api'
import BasicEntityCreator from './BasicEntityCreator'
import { EntityFactoryBuilder } from '../builder/EntityFactoryBuilder'

export default class BasicEntityCreatorBuilder {
  protected _dependencyBuilder!: IEntityDependencyListBuilder
  protected _entityManager!: IEntityManager
  protected _objectDataManager!: IManager<IObject>
  protected _entityFactoryBuilder: EntityFactoryBuilder =
    new EntityFactoryBuilder()
  protected _logger!: ILogger
  protected _tileMap!: ITilemap
  protected _renderer!: IRendererV2
  protected _input!: IInputManager

  withDependencyBuilder(dependencyBuilder: IEntityDependencyListBuilder): this {
    this._dependencyBuilder = dependencyBuilder
    return this
  }

  withEntityManager(entityManager: any): this {
    this._entityManager = entityManager
    return this
  }

  withObjectDataManager(objectDataManager: IManager<IObject>): this {
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

  build(): BasicEntityCreator {
    const entityFactory = this._entityFactoryBuilder
      .withDependencyBuilder(this._dependencyBuilder)
      .build()

    return new BasicEntityCreator(
      this._dependencyBuilder,
      this._entityManager,
      entityFactory,
      this._logger,
      this._tileMap,
      this._renderer,
      this._input,
      this._objectDataManager
    )
  }
}
