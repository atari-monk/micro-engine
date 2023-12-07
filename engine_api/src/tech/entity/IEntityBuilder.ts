import IEntity from '../entity_component/IEntity'
import IEntityDependencyListBuilder from './IEntityDependencyListBuilder'

export default interface IEntityBuilder<T extends IEntity> {
  build(dependencyBuilder: IEntityDependencyListBuilder): T
}
