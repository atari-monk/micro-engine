import { IState } from 'engine_api'
import Component from '../entity_component/Component'

export default class StateComponent extends Component {
  public state: IState = {} as IState

  constructor() {
    super('StateComponent')
  }
}
