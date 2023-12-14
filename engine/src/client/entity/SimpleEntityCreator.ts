import { IEntityManager, IManager, IObject } from 'engine_api'
import MapEntityBuilder from '../../browser/entity/builder/MapEntitBuilder'
import ObjectEntityBuilder from '../../browser/entity/builder/ObjectEntityBuilder'
import PlayerEntityBuilder from './builder/PlayerEntityBuilder'

export default class SimpleEntityCreator {
  mapEntityBuilder: MapEntityBuilder
  objectEntityBuilder: ObjectEntityBuilder
  playerEntityBuilder: PlayerEntityBuilder

  constructor(
    protected readonly _entityManager: IEntityManager,
    protected readonly _dataManager: IManager<IObject>
  ) {
    this.mapEntityBuilder = new MapEntityBuilder()
    this.objectEntityBuilder = new ObjectEntityBuilder()
    this.playerEntityBuilder = new PlayerEntityBuilder()
  }

  public createEntities() {
    this._entityManager.add('map', this.mapEntityBuilder.build())
    this.createObjectEntity('object', 'object')
    this.createPlayerEntity('player1', 'player1')
    this.createPlayerEntity('player2', 'player2')
  }

  protected createObjectEntity(entityKey: string, dataKey: string) {
    this._entityManager.add(
      entityKey,
      this.objectEntityBuilder.build(this._dataManager.getStrict(dataKey))
    )
  }

  protected createPlayerEntity(entityKey: string, dataKey: string) {
    this._entityManager.add(
      entityKey,
      this.playerEntityBuilder.build(this._dataManager.getStrict(dataKey))
    )
  }
}
