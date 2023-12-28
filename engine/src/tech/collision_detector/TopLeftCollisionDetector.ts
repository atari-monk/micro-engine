import { IObject } from 'engine_api'
import BaseCollisionDetector from './BaseCollisionDetector'

export default class TopLeftCollisionDetector extends BaseCollisionDetector {
  protected collisionAlgorithm(object1: IObject, object2: IObject): boolean {
    return (
      object1.position.x < object2.position.x + object2.size.x &&
      object1.position.x + object1.size.x > object2.position.x &&
      object1.position.y < object2.position.y + object2.size.y &&
      object1.position.y + object1.size.y > object2.position.y
    )
  }
}
