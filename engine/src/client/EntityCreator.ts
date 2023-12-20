import { default as EntityCreatorBase } from '../tech/entity/EntityCreator'

export default class EntityCreator extends EntityCreatorBase {
  createEntities() {
    this.build('map')
    this.build('object')
    this.build('spriteObject', 'object2', 'object2')
    this.build('player', 'player1', 'player1')
    this.build('player', 'player2', 'player2')
  }
}
