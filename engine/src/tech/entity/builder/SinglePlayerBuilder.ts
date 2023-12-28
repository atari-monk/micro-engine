import {
  IEntityCreator,
  IEntityDataModel,
  IEntityManager,
  IInputManager,
  ILogger,
  IManager,
  IRendererV2,
} from 'engine_api'
import EntityBuilder from '../EntityBuilder'
import Entity from '../../entity_component/Entity'
import ICustomEntityBuilder from './ICustomEntityBuilder'
import CollisionManager from '../../collision_detector/CollisionManager'

export default class SinglePlayerBuilder implements ICustomEntityBuilder {
  constructor(
    private readonly _entityCreator: IEntityCreator,
    private readonly _entityDataManager: IManager<IEntityDataModel>,
    private readonly _entityManager: IEntityManager,
    private readonly _logger: ILogger,
    private readonly _renderer: IRendererV2,
    private readonly _collisionManager: CollisionManager,
    private readonly _input: IInputManager
  ) {}

  withEntityBuilder(builderKey: string) {
    this._entityCreator.addBuilder(builderKey, this.getEntityBuilder())
  }

  getEntityBuilder() {
    const builder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
    builder.recordOperation((dataKey) =>
      builder
        .withEntity(() => new Entity())
        .withLogger(this._logger)
        .withRenderer(this._renderer)
        .withCollisionDetector(this._collisionManager.getCollisionDetector())
        .withEntityData(dataKey!)
        .withObjectComponent()
        .withSpriteComponent()
        .withRenderComponent()
        .withMovementComponent(this._input)
        .withStateComponent()
        .withCollisionHandlerComponent()
        .withCollisionComponent()
        .withLimitMoveComponent()
    )
    return builder
  }
}
