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
import EntityFactory from '../builder/EntityFactory'

export default class BasicEntityCreator {
  protected _dependencyBuilder: IEntityDependencyListBuilder
  protected _entityManager: IEntityManager
  protected _objectDataManager: IManager<IObject>
  protected _entityFactory: EntityFactory
  protected _logger: ILogger
  protected _tileMap: ITilemap
  protected _renderer: IRendererV2
  protected _input: IInputManager

  constructor(
    dependencyBuilder: IEntityDependencyListBuilder,
    entityManager: IEntityManager,
    objectDataManager: IManager<IObject>,
    entityFactory: EntityFactory,
    logger: ILogger,
    tileMap: ITilemap,
    renderer: IRendererV2,
    input: IInputManager
  ) {
    this._dependencyBuilder = dependencyBuilder
    this._entityManager = entityManager
    this._objectDataManager = objectDataManager
    this._entityFactory = entityFactory
    this._logger = logger
    this._tileMap = tileMap
    this._renderer = renderer
    this._input = input
  }

  public createEntities() {
    this.setupMapEntity()
    const object1Key = 'object'
    const player1Key = 'player1'
    this.setupObjectEntity(object1Key, object1Key)
    this.setupPlayerEntity(player1Key, player1Key)
  }

  protected setupMapEntity() {
    this._dependencyBuilder.setLogger(this._logger)
    this._dependencyBuilder.setTileMap(this._tileMap)
    this._entityManager.add('map', this._entityFactory.createMapEntity())
  }

  protected setupObjectEntity(entityName: string, objectDataKey: string) {
    this._dependencyBuilder.setRenderer(this._renderer)
    this._dependencyBuilder.setObjectData(
      this._objectDataManager.getStrict(objectDataKey)
    )
    this._entityManager.add(
      entityName,
      this._entityFactory.createObjectEntity()
    )
  }

  protected setupPlayerEntity(entityName: string, objectDataKey: string) {
    this._dependencyBuilder.setInput(this._input)
    this._dependencyBuilder.setObjectData(
      this._objectDataManager.getStrict(objectDataKey)
    )
    this._entityManager.add(
      entityName,
      this._entityFactory.createPlayerEntity()
    )
  }
}
