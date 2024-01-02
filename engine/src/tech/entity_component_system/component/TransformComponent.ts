import { IVector2 } from 'engine_api'
import Vector2 from '../../../math/vector/Vector2'
import Component from '../../entity_component/Component'

export default class TransformComponent extends Component {
  public position: IVector2 = Vector2.zero
  public size: IVector2 = Vector2.one
  public rotation: number = 0

  constructor() {
    super('TransformComponent')
  }
}
