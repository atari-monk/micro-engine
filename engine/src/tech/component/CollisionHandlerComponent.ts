import { ICollisionInfo } from 'engine_api'
import Component from '../entity_component/Component'
import Vector2 from '../../math/vector/Vector2'

export default class CollisionHandlerComponent extends Component {
  private _cor: number

  constructor() {
    super('CollisionHandlerComponent')
    this._cor = 0.7
  }

  handleCollision(collisionInfo: ICollisionInfo) {
    const object1 = collisionInfo.object1
    const object2 = collisionInfo.object2
    const velocity1 = Vector2.fromObject(object1.speed)
    const velocity2 = Vector2.fromObject(object2.speed)

    const relativeVelocity = velocity2.subtract(velocity1)

    const obj1MassFactor = (2 * object2.mass) / (object1.mass + object2.mass)
    const obj2MassFactor = (2 * object1.mass) / (object1.mass + object2.mass)

    const newObj1Velocity = velocity1
      .add(relativeVelocity.multiply(obj1MassFactor))
      .multiply(this._cor)
    
    const newObj2Velocity = velocity2
      .subtract(relativeVelocity.multiply(obj2MassFactor))
      .multiply(this._cor)

    object1.speed = Vector2.fromObject(newObj1Velocity)
    object2.speed = Vector2.fromObject(newObj2Velocity)
  }
}
