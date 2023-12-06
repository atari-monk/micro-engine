import { IEntity, IEntityBuilder, ILogger } from 'engine_api'
import { EntityDependencyListBuilder } from './EntityDependencyListBuilder'

export default class EntityBuilder<T extends IEntity>
  extends EntityDependencyListBuilder
  implements IEntityBuilder<T>
{
  protected entity: T

  constructor(entityType: new () => T) {
    super()
    this.entity = new entityType()
  }

  buildComponents() {}

  build(): T {
    this.entity.logger = this.logger
    this.buildComponents()
    return this.entity
  }
}
