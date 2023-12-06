import IEntity from './IEntity'

export default interface IEntityBuilder<T extends IEntity> {
  build(): T
}
