import IEntity from '../entity_component/IEntity'
import IState from './IState'

export default abstract class State implements IState {
  enter(entity: IEntity): void {}
  execute(entity: IEntity): void {}
  exit(entity: IEntity): void {}
}
