import { IEntity, IEventSystem, IState } from 'engine_api'
import ObjectComponent from '../component/ObjectComponent'

export default class IdleState implements IState {
  constructor(private readonly _eventSystem: IEventSystem) {}

  enter(entity: IEntity): void {
    this._eventSystem.publish('animation', {
      id: entity.getComponentByType(ObjectComponent).id,
      animId: 0,
    })
  }
  execute(entity: IEntity): void {}
  exit(entity: IEntity): void {}
}
