import {
  IEntityCreator,
  IEntityDataModel,
  IEntityManager,
  IEventSystem,
  ILogger,
  IManager,
  IRendererV2,
} from 'engine_api'
import EntityBuilder from '../EntityBuilder'
import Entity from '../../entity_component/Entity'
import ICustomEntityBuilder from './ICustomEntityBuilder'
import Vector2 from '../../../math/vector/Vector2'

export default class BallBuilder implements ICustomEntityBuilder {
  constructor(
    private readonly _entityCreator: IEntityCreator,
    private readonly _entityDataManager: IManager<IEntityDataModel>,
    private readonly _entityManager: IEntityManager,
    private readonly _logger: ILogger,
    private readonly _renderer: IRendererV2,
    private readonly _eventSystem: IEventSystem
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
        .withEventSystem(this._eventSystem)
        .withEntityData(dataKey!)
        .withObjectComponent()
        .withRenderComponent()
        .withStateComponent()
        .withKinematicsComponent(0.85, 5)
        .withCollisionCircleComponent()
        .withWallComponent(new Vector2(740, 360))
    )
    return builder
  }
}
