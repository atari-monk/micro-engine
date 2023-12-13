import {
  IEntity,
  IEntityBuilder,
  IEntityDependencyListBuilder,
} from 'engine_api'

export default class EntityBuilder<T extends IEntity>
  implements IEntityBuilder<T>
{
  protected entity!: T

  constructor(
    private readonly _entityType: { new (): T },
    protected readonly _dependencyBuilder: IEntityDependencyListBuilder
  ) {}

  assertEntityDependencies(): void {
    const getMessage = (propName: string) =>
      `${propName} must be set before building all entities.`

    if (!this._dependencyBuilder.logger) {
      throw new Error(getMessage('logger'))
    }
  }

  assertComponentDependencies() {}

  buildComponents() {}

  build(): T {
    this.entity = new this._entityType()
    this.assertEntityDependencies()
    this.entity.logger = this._dependencyBuilder.logger
    this.assertComponentDependencies()
    this.buildComponents()
    return this.entity
  }
}
