import EntityBuilder from './EntityBuilder'
import ObjectComponent from '../../component/ObjectComponent'
import RenderComponent from '../../component/RenderComponent'
import ObjectEntity from '../ObjectEntity'
import { IEntityDependencyListBuilder } from 'engine_api'

export default class ProtoObjectEntityBuilder extends EntityBuilder<ObjectEntity> {
  constructor(
    entityType: new () => ObjectEntity,
    dependencyBuilder: IEntityDependencyListBuilder
  ) {
    super(entityType, dependencyBuilder)
  }

  assertComponentDependencies(): void {
    const getMessage = (propName: string, entityName = 'ProtoObjectEntity') =>
      `${propName} must be set before building ${entityName} entity.`

    if (!this._dependencyBuilder.objectData) {
      throw new Error(getMessage('objectData'))
    }

    if (!this._dependencyBuilder.renderer) {
      throw new Error(getMessage('renderer'))
    }
  }

  buildComponents() {
    const object = new ObjectComponent(this._dependencyBuilder.objectData)
    const render = new RenderComponent(object, this._dependencyBuilder.renderer)

    this.entity.addComponent(object)
    this.entity.addComponent(render)
  }
}
