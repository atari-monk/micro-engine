import {
  IEntityDependencyListBuilder,
  IEntityManager,
  IManager,
  ILogger,
  ITilemap,
  IRendererV2,
  IInputManager,
  ISprite,
} from 'engine_api'
import BasicEntityCreator from './BasicEntityCreator'
import EntityFactory from '../builder/EntityFactory'

export class SpriteEntityCreator extends BasicEntityCreator {
  protected _spriteDataManager: IManager<ISprite>

  constructor(
    dependencyBuilder: IEntityDependencyListBuilder,
    entityManager: IEntityManager,
    spriteDataManager: IManager<ISprite>,
    entityFactory: EntityFactory,
    logger: ILogger,
    tileMap: ITilemap,
    renderer: IRendererV2,
    input: IInputManager
  ) {
    super(
      dependencyBuilder,
      entityManager,
      entityFactory,
      logger,
      tileMap,
      renderer,
      input
    )
    this._spriteDataManager = spriteDataManager
  }

  public createEntities() {
    this.setupMapEntity()
    const object1Key = 'object'
    //const player1Key = 'player1'
    this.setupObjectEntity(object1Key, object1Key)
    //this.setupPlayerEntity(player1Key, player1Key)
  }

  protected setupObjectEntity(entityName: string, objectDataKey: string) {
    const spriteData = this._spriteDataManager.getStrict(objectDataKey)
    this._dependencyBuilder.setAnimationConfig(spriteData.animations)
    this._dependencyBuilder.setObjectData(spriteData.object)
    this._dependencyBuilder.setRenderer(this._renderer)
    this._entityManager.add(
      entityName,
      this._entityFactory.createObjectEntity()
    )
  }
}
