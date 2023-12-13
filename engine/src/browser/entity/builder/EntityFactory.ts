import { IEntityBuilder, IEntityDependencyListBuilder } from 'engine_api'
import ObjectEntity from '../ObjectEntity'
import PlayerEntity from '../PlayerEntity'
import MapEntityBuilder from './MapEntitBuilder'
import ProtoObjectEntityBuilder from './ProtoObjectEntityBuilder'
import MapEntity from '../MapEntity'
import PlayerEntityBuilder from './PlayerEntityBuilder'
import SpriteObjectEntityBuilder from './SpriteObjectEntityBuilder'

export default class EntityFactory {
  private _mapEntityBuilder: IEntityBuilder<MapEntity>
  private _objectEntityBuilder: IEntityBuilder<ObjectEntity>
  private _playerEntityBuilder: IEntityBuilder<PlayerEntity>

  set objectEntityBuilder(objectEntityBuilder: IEntityBuilder<ObjectEntity>) {
    this._objectEntityBuilder = objectEntityBuilder
  }

  set playerEntityBuilder(playerEntityBuilder: IEntityBuilder<PlayerEntity>) {
    this._playerEntityBuilder = playerEntityBuilder
  }

  constructor(
    private readonly _dependencyBuilder: IEntityDependencyListBuilder
  ) {
    this._mapEntityBuilder = new MapEntityBuilder(
      MapEntity,
      this._dependencyBuilder
    )
    this._objectEntityBuilder = new SpriteObjectEntityBuilder(
      ObjectEntity,
      this._dependencyBuilder
    )
    this._playerEntityBuilder = new PlayerEntityBuilder(
      PlayerEntity,
      this._dependencyBuilder
    )
  }

  createMapEntity() {
    return this._mapEntityBuilder.build(this._dependencyBuilder)
  }

  createObjectEntity() {
    return this._objectEntityBuilder.build(this._dependencyBuilder)
  }

  createPlayerEntity() {
    return this._playerEntityBuilder.build(this._dependencyBuilder)
  }
}
