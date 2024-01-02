import { IVector2 } from 'engine_api'
import Component from '../entity_component/Component'
import Vector2 from '../../math/vector/Vector2'

export default class MovementComponent extends Component {
  public velocity: IVector2 = Vector2.zero
  public useArrowKeys: boolean = true
  public moveSpeed: number = 50

  constructor() {
    super('MovementComponent')
  }
}
