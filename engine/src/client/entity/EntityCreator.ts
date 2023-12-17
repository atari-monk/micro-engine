import { default as EntityCreatorBase } from './../../browser/entity/EntityCreator'

export default class EntityCreator extends EntityCreatorBase {
  createEntities() {
    if (!this._entityManager)
      throw new Error('entityManager must be set in EntityCreator !')
    if (!this._dataManager)
      throw new Error('dataManager must be set in EntityCreator !')
    this._entityManager.add('map', this._mapEntityBuilder.build())
    this.createObjectEntity('object', 'object')
    this.createSpriteObjectEntity('object2', 'object2')
    this.createPlayerEntity('player1', 'player1')
    this.createPlayerEntity('player2', 'player2')
  }
}
