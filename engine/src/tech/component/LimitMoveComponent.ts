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
    const halfWidth = this._object.size.x / 2
    const halfHeight = this._object.size.y / 2

    const newX = Math.max(
      halfWidth,
      Math.min(this._limitSize.x - halfWidth, this._object.position.x)
    )
    const newY = Math.max(
      halfHeight,
      Math.min(this._limitSize.y - halfHeight, this._object.position.y)
    )

    this._object.position.x = newX
    this._object.position.y = newY
  }
}
