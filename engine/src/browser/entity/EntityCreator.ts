import {
  IEntityManager,
  IManager,
  IEntityDataModel,
  IEntityBuilder,
  IObject,
  IDataEntityBuilder,
} from 'engine_api'
import MapEntity from './MapEntity'
import ObjectEntity from './ObjectEntity'
import PlayerEntity from './PlayerEntity'
import IEntityCreatorWithBuilders from './IEntityCreatorWithBuilders'

export default class EntityCreator implements IEntityCreatorWithBuilders {
  private _mapEntityBuilder!: IEntityBuilder<MapEntity>
  private _objectEntityBuilder!: IDataEntityBuilder<ObjectEntity, IObject>
  private _spriteObjectEntityBuilder!: IDataEntityBuilder<
    ObjectEntity,
    IEntityDataModel
  >
  private _playerEntityBuilder!: IDataEntityBuilder<PlayerEntity, IObject>

  private _entityManager!: IEntityManager
  private _dataManager!: IManager<IEntityDataModel>

  set entityManager(entityManager: IEntityManager) {
    this._entityManager = entityManager
  }

  set dataManager(dataManager: IManager<IEntityDataModel>) {
    this._dataManager = dataManager
  }

  set mapEntityBuilder(mapEntityBuilder: IEntityBuilder<MapEntity>) {
    this._mapEntityBuilder = mapEntityBuilder
  }

  set objectEntityBuilder(
    objectEntityBuilder: IDataEntityBuilder<ObjectEntity, IObject>
  ) {
    this._objectEntityBuilder = objectEntityBuilder
  }

  set spriteObjectEntityBuilder(
    spriteObjectEntityBuilder: IDataEntityBuilder<
      ObjectEntity,
      IEntityDataModel
    >
  ) {
    this._spriteObjectEntityBuilder = spriteObjectEntityBuilder
  }

  set playerEntityBuilder(
    playerEntityBuilder: IDataEntityBuilder<PlayerEntity, IObject>
  ) {
    this._playerEntityBuilder = playerEntityBuilder
  }

  createEntities() {
    if (!this._entityManager)
      throw new Error('entityManager must be set in EntityCreator !')
    if (!this._dataManager)
      throw new Error('dataManager must be set in EntityCreator !')
    this._entityManager.add('map', this._mapEntityBuilder.build())
    this.createObjectEntity('object', 'object')
    this.createPlayerEntity('player1', 'player1')
    this.createSpriteObjectEntity('object2', 'object2')
  }

  private createObjectEntity(entityKey: string, dataKey: string) {
    this._entityManager.add(
      entityKey,
      this._objectEntityBuilder.build(
        this._dataManager.getStrict(dataKey).object
      )
    )
  }

  private createSpriteObjectEntity(entityKey: string, dataKey: string) {
    this._entityManager.add(
      entityKey,
      this._spriteObjectEntityBuilder.build(
        this._dataManager.getStrict(dataKey)
      )
    )
  }

  private createPlayerEntity(entityKey: string, dataKey: string) {
    this._entityManager.add(
      entityKey,
      this._playerEntityBuilder.build(
        this._dataManager.getStrict(dataKey).object
      )
    )
  }
}
