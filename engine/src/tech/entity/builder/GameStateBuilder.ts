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

export default class GameStateBuilder implements ICustomEntityBuilder {
  constructor(
    private readonly _entityCreator: IEntityCreator,
    private readonly _entityDataManager: IManager<IEntityDataModel>,
    private readonly _entityManager: IEntityManager,
    private readonly _logger: ILogger,
    private readonly _eventSystem: IEventSystem,
    private readonly _renderer: IRendererV2
  ) {}

  withEntityBuilder(builderKey: string) {
    this._entityCreator.addBuilder(builderKey, this.getEntityBuilder())
  }

  getEntityBuilder() {
    const builder = new EntityBuilder(
      this._entityDataManager,
      this._entityManager
    )
    builder.recordOperation(() => {
      builder
        .withEntity(() => new Entity())
        .withLogger(this._logger)
        .withRenderer(this._renderer)
        .withEventSystem(this._eventSystem)
        .withGameStateComponent()
    })
    return builder
  }
}
