import { IEntityDependencyListBuilder } from 'engine_api'
import EntityBuilder from '../../../browser/entity/builder/EntityBuilder'
import ObjectEntity from '../../../browser/entity/ObjectEntity'
import ObjectComponent from '../../../browser/component/ObjectComponent'

export default class ObjectEntityBuilder extends EntityBuilder<ObjectEntity> {
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
  }

  buildComponents() {
    const object = new ObjectComponent(this._dependencyBuilder.objectData)

    this.entity.addComponent(object)
  }
}
