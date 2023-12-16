import IEntity from '../../../tech/entity_component/IEntity'

export default interface IDataEntityBuilder<T extends IEntity, TData> {
  build(data: TData): T
}
