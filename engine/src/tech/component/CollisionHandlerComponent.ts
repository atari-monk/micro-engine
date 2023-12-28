import { ICollisionHandler, ICollisionInfo } from 'engine_api'
import Component from '../entity_component/Component'

export default class CollisionHandlerComponent extends Component {
  constructor(private readonly _handler: ICollisionHandler) {
    super('CollisionHandlerComponent')
  }

  handleCollision(collisionInfo: ICollisionInfo) {
    this._handler.handleCollision(collisionInfo)
  }
}
