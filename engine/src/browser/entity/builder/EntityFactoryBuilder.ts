import { IEntityDependencyListBuilder } from 'engine_api'
import EntityFactory from './EntityFactory'
import { EntityDependencyListBuilder } from './EntityDependencyListBuilder'

export class EntityFactoryBuilder {
  private _dependencyBuilder: IEntityDependencyListBuilder =
    new EntityDependencyListBuilder()

  withDependencyBuilder(dependencyBuilder: IEntityDependencyListBuilder): this {
    this._dependencyBuilder = dependencyBuilder
    return this
  }

  build(): EntityFactory {
    return new EntityFactory(this._dependencyBuilder)
  }
}
