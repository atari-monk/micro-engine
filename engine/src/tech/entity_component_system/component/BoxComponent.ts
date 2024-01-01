import { IVector2 } from 'engine_api'
import Vector2 from '../../../math/vector/Vector2'
import Component from '../../entity_component/Component'

export default class BoxComponent extends Component {
  size: IVector2 = new Vector2(10, 10)
}
