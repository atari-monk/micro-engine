import {
  IEntityCreator,
  IEntityDataModel,
  IEntityManager,
  ILogger,
  IManager,
  ITileMap,
} from 'engine_api'
import EntityBuilder from '../EntityBuilder'
import Entity from '../../entity_component/Entity'
import ICustomEntityBuilder from './ICustomEntityBuilder'

export default class TileMapBuilder implements ICustomEntityBuilder {
  constructor(
    private readonly _entityCreator: IEntityCreator,
    private readonly _entityDataManager: IManager<IEntityDataModel>,
    private readonly _entityManager: IEntityManager,
    private readonly _logger: ILogger,
    private readonly _tileMap: ITileMap
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
        .withMapComponent(this._tileMap)
    })
    return builder
  }
}
