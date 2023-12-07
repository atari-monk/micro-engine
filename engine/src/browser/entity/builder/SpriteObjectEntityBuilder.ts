import EntityBuilder from './EntityBuilder'
import ObjectComponent from '../../component/ObjectComponent'
import SpriteComponent from '../../component/SpriteComponent'
import { IEntityDependencyListBuilder } from 'engine_api'
import ObjectEntity from '../ObjectEntity'

export default class SpriteObjectEntityBuilder extends EntityBuilder<ObjectEntity> {
  constructor(
    entityType: new () => ObjectEntity,
    dependencyBuilder: IEntityDependencyListBuilder
  ) {
    super(entityType, dependencyBuilder)
  }

  assertComponentDependencies(): void {
    const getMessage = (propName: string, entityName = 'SpriteObjectEntity') =>
      `${propName} must be set before building ${entityName} entity.`

    if (!this._dependencyBuilder.objectData) {
      throw new Error(getMessage('objectData'))
    }

    if (!this._dependencyBuilder.renderer) {
      throw new Error(getMessage('renderer'))
    }

    if (!this._dependencyBuilder.animConfig) {
      throw new Error(getMessage('animConfig'))
    }
  }

  buildComponents() {
    const object = new ObjectComponent(this._dependencyBuilder.objectData)
    const render = new SpriteComponent(
      this._dependencyBuilder.renderer,
      object,
      this._dependencyBuilder.animConfig
    )

    this.entity.addComponent(object)
    this.entity.addComponent(render)
  }
}
