import {
  IEntityCreator,
  IEntityManager,
  IManager,
  IEntityDataModel,
} from 'engine_api'
import MapEntityBuilder from './builder/MapEntitBuilder'
import PlayerEntityBuilder from './builder/PlayerEntityBuilder'
import SpriteObjectEntityBuilder from './builder/SpriteObjectEntityBuilder'
import ObjectEntityBuilder from './builder/ObjectEntityBuilder'

export default class EntityCreator implements IEntityCreator {
  mapEntityBuilder: MapEntityBuilder
  objectEntityBuilder: ObjectEntityBuilder
  spriteObjectEntityBuilder: SpriteObjectEntityBuilder
  playerEntityBuilder: PlayerEntityBuilder

  private _entityManager!: IEntityManager
  private _dataManager!: IManager<IEntityDataModel>

  set entityManager(entityManager: IEntityManager) {
    this._entityManager = entityManager
  }

  set dataManager(dataManager: IManager<IEntityDataModel>) {
    this._dataManager = dataManager
  }

  constructor() {
    this.mapEntityBuilder = new MapEntityBuilder()
    this.objectEntityBuilder = new ObjectEntityBuilder()
    this.spriteObjectEntityBuilder = new SpriteObjectEntityBuilder()
    this.playerEntityBuilder = new PlayerEntityBuilder()
  }

  createEntities() {
    if (!this._entityManager)
      throw new Error('entityManager must be set in EntityCreator !')
    if (!this._dataManager)
      throw new Error('dataManager must be set in EntityCreator !')
    this._entityManager.add('map', this.mapEntityBuilder.build())
    this.createObjectEntity('object', 'object')
    this.createPlayerEntity('player1', 'player1')
    this.createSpriteObjectEntity('object2', 'object2')
  }

  private createObjectEntity(entityKey: string, dataKey: string) {
    this._entityManager.add(
      entityKey,
      this.objectEntityBuilder.build(
        this._dataManager.getStrict(dataKey).object
      )
    )
  }

  private createSpriteObjectEntity(entityKey: string, dataKey: string) {
    this._entityManager.add(
      entityKey,
      this.spriteObjectEntityBuilder.build(this._dataManager.getStrict(dataKey))
    )
  }

  private createPlayerEntity(entityKey: string, dataKey: string) {
    this._entityManager.add(
      entityKey,
      this.playerEntityBuilder.build(
        this._dataManager.getStrict(dataKey).object
      )
    )
  }
}
