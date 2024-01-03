import { IEntity, IEntityManager } from 'engine_api'
import ObjectComponent from '../../component/ObjectComponent'
import WallComponent from '../component/WallComponent'
import CollisionCircleComponent from '../component/CollisionCircleComponent'
import CircleComponent from '../component/CircleComponent'
import LogicSystemBase from './logic/LogicSystemBase'

enum Axis {
  X = 'x',
  Y = 'y',
}

export default class InsideWallsCollisionSystem extends LogicSystemBase {
  constructor(entityManager: IEntityManager) {
    super(entityManager)
  }

  updateLogic(deltaTime: number, entity: IEntity) {
    const objectComponent = entity.getComponentByType(ObjectComponent)
    const circleComponent = entity.getComponentByType(CollisionCircleComponent)
    const wallComponent = entity.getComponentByType(WallComponent)

    ;[Axis.X, Axis.Y].forEach((axis: any) => {
      this.checkAndHandleCollision(
        objectComponent,
        circleComponent,
        wallComponent,
        axis
      )
    })
  }

  private checkAndHandleCollision(
    object: ObjectComponent,
    circle: CircleComponent,
    wall: WallComponent,
    axis: Axis
  ) {
    const position = object.position[axis]
    const radius = circle.radius
    const wallPosition = wall.size[axis]

    if (this.isCollisionDetected(position, radius, wallPosition)) {
      this.resolveCollision(object, radius, wallPosition, axis)
    }
  }

  private isCollisionDetected(
    position: number,
    radius: number,
    maxlimit: number,
    minLimit: number = 0
  ): boolean {
    return position - radius <= minLimit || position + radius >= maxlimit
  }

  private resolveCollision(
    object: ObjectComponent,
    radius: number,
    maxLimit: number,
    axis: Axis
  ) {
    object.velocity[axis] *= -1
    object.position[axis] = this.adjustPosition(
      object.position[axis],
      radius,
      maxLimit
    )
  }

  private adjustPosition(
    position: number,
    radius: number,
    limit: number
  ): number {
    return Math.max(radius, Math.min(limit - radius, position))
  }
}
