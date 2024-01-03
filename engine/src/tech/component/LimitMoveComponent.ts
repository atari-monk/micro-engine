import Vector2 from '../../math/vector/Vector2'
import Component from '../entity_component/Component'
import { IVector2 } from 'engine_api'

export default class LimitMoveComponent extends Component {
  public limitSize: IVector2 = new Vector2()

  constructor() {
    super('LimitMoveComponent')
  }
}
