import { IEntity, IEventSystem, IState } from 'engine_api'
import Component from '../entity_component/Component'
import IdleState from '../state_machine/IdleState'

export default class StateComponent extends Component {
  private _entity: IEntity
  private _state: IState

  constructor(entity: IEntity, eventSystem: IEventSystem) {
    super('StateComponent')
    this._entity = entity
    this._state = new IdleState(eventSystem)
    this._state.enter(entity)
  }

  update(): void {
    this._state.execute(this._entity)
  }

  changeState(newState: IState, force: boolean = false): boolean {
    if (force || !(this._state instanceof newState.constructor)) {
      this._state.exit(this._entity)
      this._state = newState
      this._state.enter(this._entity)
      return true
    } else {
      return false
    }
  }
}
