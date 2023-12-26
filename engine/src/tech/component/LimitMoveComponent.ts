import Component from '../entity_component/Component'
import { IObject, IVector2 } from 'engine_api'

export default class LimitMoveComponent extends Component {
  constructor(
    private readonly _limitSize: IVector2,
    private readonly _object: IObject
  ) {
    super('LimitMoveComponent')
  }

  update(dt: number) {
    const newX = Math.max(
      0,
      Math.min(this._limitSize.x - this._object.size.x, this._object.position.x)
    )
    const newY = Math.max(
      0,
      Math.min(this._limitSize.y - this._object.size.y, this._object.position.y)
    )

    this._object.position.x = newX
    this._object.position.y = newY
  }
}
