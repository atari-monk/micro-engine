import {
  IEntityDependencyListBuilder,
  IEntityManager,
  IInputManager,
  ILogger,
  IObjectDataManager,
  IRendererV2,
  ITilemap,
} from 'engine_api'
import EntityFactory from './builder/EntityFactory'

export default class EntityCreator {
  private _dependencyBuilder: IEntityDependencyListBuilder
  private _entityManager: IEntityManager
  private _objectDataManager: IObjectDataManager
  private _entityFactory: EntityFactory
  private _logger: ILogger
  private _tileMap: ITilemap
  private _renderer: IRendererV2
  private _input: IInputManager

  constructor(
    dependencyBuilder: IEntityDependencyListBuilder,
    entityManager: IEntityManager,
    objectDataManager: IObjectDataManager,
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
    this._entityManager.addEntity('map', this._entityFactory.createMapEntity())
  }

  protected setupObjectEntity(entityName: string, objectDataKey: string) {
    this._dependencyBuilder.setRenderer(this._renderer)
    this._dependencyBuilder.setObjectData(
      this._objectDataManager.getObjectData(objectDataKey)
    )
    this._entityManager.addEntity(
      entityName,
      this._entityFactory.createObjectEntity()
    )
  }

  protected setupPlayerEntity(entityName: string, objectDataKey: string) {
    this._dependencyBuilder.setInput(this._input)
    this._dependencyBuilder.setObjectData(
      this._objectDataManager.getObjectData(objectDataKey)
    )
    this._entityManager.addEntity(
      entityName,
      this._entityFactory.createPlayerEntity()
    )
  }
}
