import IEntity from '../../../tech/entity_component/IEntity'

export default interface IEntityBuilder<T extends IEntity> {
  build(): T
}
