import EntityBuilder from './EntityBuilder'
import ObjectComponent from '../../component/ObjectComponent'
import PlayerEntity from '../PlayerEntity'
import RenderComponent from '../../component/RenderComponent'
import MovementComponent from '../../component/MovementComponent'
import { IEntityDependencyListBuilder } from 'engine_api'

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

    if (!this._dependencyBuilder.renderer) {
      throw new Error(getMessage('renderer'))
    }

    if (!this._dependencyBuilder.input) {
      throw new Error(getMessage('input'))
    }
  }

  buildComponents() {
    const object = new ObjectComponent(this._dependencyBuilder.objectData)
    const render = new RenderComponent(object, this._dependencyBuilder.renderer)
    const move = new MovementComponent(
      object,
      this._dependencyBuilder.input,
      this._dependencyBuilder.logger
    )

    this.entity.addComponent(object)
    this.entity.addComponent(render)
    this.entity.addComponent(move)
  }
}
