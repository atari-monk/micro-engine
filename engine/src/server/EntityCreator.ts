import { default as EntityCreatorBase } from '../tech/entity/EntityCreator'

export default class EntityCreator extends EntityCreatorBase {
  createEntities() {
    this.build('map', '', 'map1')
    this.build('object', 'object1', 'object1')
    this.build('object', 'object2', 'object2')
    this.build('object', 'object3', 'object3')
    this.build('player', 'player1', 'player1')
    this.build('player', 'player2', 'player2')
  }
}
