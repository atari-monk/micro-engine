import { IObject } from 'engine_api'
import BaseCollisionDetector from './BaseCollisionDetector'

export default class CenterCollisionDetector extends BaseCollisionDetector {
  protected collisionAlgorithm(object1: IObject, object2: IObject): boolean {
    const halfWidth1 = object1.size.x / 2
    const halfHeight1 = object1.size.y / 2
    const halfWidth2 = object2.size.x / 2
    const halfHeight2 = object2.size.y / 2

    return (
      object1.position.x - halfWidth1 < object2.position.x + halfWidth2 &&
      object1.position.x + halfWidth1 > object2.position.x - halfWidth2 &&
      object1.position.y - halfHeight1 < object2.position.y + halfHeight2 &&
      object1.position.y + halfHeight1 > object2.position.y - halfHeight2
    )
  }
}
