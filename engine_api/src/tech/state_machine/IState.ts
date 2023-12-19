import IEntity from '../entity_component/IEntity'

export default interface IState {
  enter(entity: IEntity): void
  execute(entity: IEntity): void
  exit(entity: IEntity): void
}
