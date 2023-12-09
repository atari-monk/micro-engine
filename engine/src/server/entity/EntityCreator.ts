import { default as EntityCreatorBase } from '../../browser/entity/creator/BasicEntityCreator'

export default class EntityCreator extends EntityCreatorBase {
  protected setupObjectEntity(entityName: string, objectDataKey: string) {
    this._dependencyBuilder.setObjectData(
      this._objectDataManager.getObjectData(objectDataKey)
    )
    this._entityManager.addEntity(
      entityName,
      this._entityFactory.createObjectEntity()
    )
  }

  protected setupPlayerEntity(entityName: string, objectDataKey: string) {
    this._dependencyBuilder.setObjectData(
      this._objectDataManager.getObjectData(objectDataKey)
    )
    this._entityManager.addEntity(
      entityName,
      this._entityFactory.createPlayerEntity()
    )
  }

  public createEntities() {
    this.setupMapEntity()
    const object1Key = 'object'
    const player1Key = 'player1'
    const player2Key = 'player2'
    this.setupObjectEntity(object1Key, object1Key)
    this.setupPlayerEntity(player1Key, player1Key)
    this.setupPlayerEntity(player2Key, player2Key)
  }
}
