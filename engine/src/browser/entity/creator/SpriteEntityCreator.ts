import {
  IEntityDependencyListBuilder,
  IEntityManager,
  IObjectDataManager,
  ILogger,
  ITilemap,
  IRendererV2,
  IInputManager,
  IAnimationConfig,
} from 'engine_api'
import BasicEntityCreator from './BasicEntityCreator'
import EntityFactory from '../builder/EntityFactory'

export class SpriteEntityCreator extends BasicEntityCreator {
  protected _animConfig: IAnimationConfig[]

  constructor(
    dependencyBuilder: IEntityDependencyListBuilder,
    entityManager: IEntityManager,
    objectDataManager: IObjectDataManager,
    entityFactory: EntityFactory,
    logger: ILogger,
    tileMap: ITilemap,
    renderer: IRendererV2,
    input: IInputManager,
    animConfig: IAnimationConfig[]
  ) {
    super(
      dependencyBuilder,
      entityManager,
      objectDataManager,
      entityFactory,
      logger,
      tileMap,
      renderer,
      input
    )
    this._animConfig = animConfig
  }

  protected setupObjectEntity(entityName: string, objectDataKey: string) {
    this._dependencyBuilder.setAnimationConfig(this._animConfig)
    this._dependencyBuilder.setObjectData(
      this._objectDataManager.getStrict(objectDataKey)
    )
    this._entityManager.addEntity(
      entityName,
      this._entityFactory.createObjectEntity()
    )
  }
}
