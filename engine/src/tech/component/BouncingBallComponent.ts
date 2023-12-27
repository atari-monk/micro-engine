import Component from '../entity_component/Component'
import { IObject, IVector2 } from 'engine_api'

export default class BouncingBallComponent extends Component {
  private _ballRadius: number

  constructor(
    private readonly _boundarySize: IVector2,
    private readonly _object: IObject
  ) {
    super('BouncingBallComponent')
    this._ballRadius = this._object.size.x / 2
  }

  update(dt: number) {
    this.checkAndHandleCollisionX()
    this.checkAndHandleCollisionY()
  }

  private checkAndHandleCollisionX() {
    if (
      this._object.position.x - this._ballRadius <= 0 ||
      this._object.position.x + this._ballRadius >= this._boundarySize.x
    ) {
      this._object.velocity.x *= -1
      this._object.position.x = Math.max(
        this._ballRadius,
        Math.min(
          this._boundarySize.x - this._ballRadius,
          this._object.position.x
        )
      )
    }
  }

  private checkAndHandleCollisionY() {
    if (
      this._object.position.y - this._ballRadius <= 0 ||
      this._object.position.y + this._ballRadius >= this._boundarySize.y
    ) {
      this._object.velocity.y *= -1
      this._object.position.y = Math.max(
        this._ballRadius,
        Math.min(
          this._boundarySize.y - this._ballRadius,
          this._object.position.y
        )
      )
    }
  }
}
