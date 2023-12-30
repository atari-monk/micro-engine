import { IEntity, IState } from 'engine_api'
import Component from '../entity_component/Component'
import IdleState from './IdleState'

export default class StateComponent extends Component {
  private _owner: IEntity
  private _state: IState

  constructor(owner: IEntity) {
    super('StateComponent')
    this._owner = owner
    this._state = new IdleState()
    this._state.enter(owner)
  }

  update(): void {
    this._state.execute(this._owner)
  }

  changeState(newState: IState): void {
    this._state.exit(this._owner)
    this._state = newState
    this._state.enter(this._owner)
  }
}
