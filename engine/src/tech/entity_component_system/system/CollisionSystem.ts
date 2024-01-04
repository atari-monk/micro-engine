import {
  ICollisionDetector,
  ICollisionHandler,
  IEntity,
  IEntityManager,
} from 'engine_api'
import LogicSystemBase from './logic/LogicSystemBase'
import ObjectComponent from '../../component/ObjectComponent'
import CollisionComponent from '../../component/CollisionComponent'

export default class CollisionSystem extends LogicSystemBase {
  constructor(
    entityManager: IEntityManager,
    private readonly _collisionDetector: ICollisionDetector,
    private readonly _collisionHandler: ICollisionHandler
  ) {
    super(entityManager)
  }

  initilize(entity: IEntity) {
    const [objectComponent, objectComponent2] = this.getData(entity)
    this._collisionDetector.subscribeToCollisions(
      objectComponent,
      objectComponent2,
      this._collisionHandler.handleCollision.bind(this._collisionHandler)
    )
  }

  private getData(entity: IEntity): [ObjectComponent, ObjectComponent] {
    const objectComponent = entity.getComponentByTypeStrict(ObjectComponent)
    const collisionComponent = entity.getComponentByTypeStrict(CollisionComponent)
    const objectComponent2 = this.entityManager
      .getStrict(collisionComponent.objectIdToCollideWith)
      .getComponentByTypeStrict(ObjectComponent)
    return [objectComponent, objectComponent2]
  }

  updateLogic(deltaTime: number, entity: IEntity): void {
    const [objectComponent, objectComponent2] = this.getData(entity)
    this._collisionDetector.checkCollision(objectComponent, objectComponent2)
  }
}
