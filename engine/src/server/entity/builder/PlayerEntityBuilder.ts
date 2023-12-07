import { IEntityDependencyListBuilder } from 'engine_api'
import ObjectComponent from '../../../browser/component/ObjectComponent'
import PlayerEntity from '../../../browser/entity/PlayerEntity'
import EntityBuilder from '../../../browser/entity/builder/EntityBuilder'
import MovementComponent from '../../component/MovementComponent'

export default class PlayerEntityBuilder extends EntityBuilder<PlayerEntity> {
  constructor(
    entityType: new () => PlayerEntity,
    dependencyBuilder: IEntityDependencyListBuilder
  ) {
    super(entityType, dependencyBuilder)
  }

  assertComponentDependencies(): void {
    const getMessage = (propName: string, entityName = 'Player') =>
      `${propName} must be set before building ${entityName} entity.`

    if (!this._dependencyBuilder.objectData) {
      throw new Error(getMessage('objectData'))
    }
  }

  buildComponents() {
    const object = new ObjectComponent(this._dependencyBuilder.objectData)
    const move = new MovementComponent(object)

    this.entity.addComponent(object)
    this.entity.addComponent(move)
  }
}
