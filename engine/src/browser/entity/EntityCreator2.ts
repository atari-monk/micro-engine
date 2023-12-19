import { IEntityManager, IManager, IEntityDataModel } from 'engine_api'
import IEntityCreatorWithBuilders2 from './IEntityCreatorWithBuilders2'
import EntityBuilder from './builder/EntityBuilder'

export default class EntityCreator2 implements IEntityCreatorWithBuilders2 {
  protected _entityManager!: IEntityManager
  protected _dataManager!: IManager<IEntityDataModel>

  protected _mapEntityBuilder!: EntityBuilder
  private _objectEntityBuilder!: EntityBuilder
  private _spriteObjectEntityBuilder!: EntityBuilder
  private _playerEntityBuilder!: EntityBuilder

  set entityManager(entityManager: IEntityManager) {
    this._entityManager = entityManager
  }

  set dataManager(dataManager: IManager<IEntityDataModel>) {
    this._dataManager = dataManager
  }

  set mapEntityBuilder(mapEntityBuilder: EntityBuilder) {
    this._mapEntityBuilder = mapEntityBuilder
  }

  set objectEntityBuilder(objectEntityBuilder: EntityBuilder) {
    this._objectEntityBuilder = objectEntityBuilder
  }

  set spriteObjectEntityBuilder(spriteObjectEntityBuilder: EntityBuilder) {
    this._spriteObjectEntityBuilder = spriteObjectEntityBuilder
  }

  set playerEntityBuilder(playerEntityBuilder: EntityBuilder) {
    this._playerEntityBuilder = playerEntityBuilder
  }

  createEntities() {
    this._mapEntityBuilder.build('map', 'map')
    this._objectEntityBuilder.build('object', 'object')
    this._spriteObjectEntityBuilder.build('object2', 'object2')
    this._playerEntityBuilder.build('player1', 'player1')
  }
}
