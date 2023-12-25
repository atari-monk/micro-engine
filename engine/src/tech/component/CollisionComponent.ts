import { ICollisionDetector, IEntity, IObject } from 'engine_api'
import Component from '../entity_component/Component'
import ObjectComponent from './ObjectComponent'
import CollisionHandlerComponent from './CollisionHandlerComponent'

export default class CollisionComponent extends Component {
  private _object2!: IObject

  set object2(object: IObject) {
    this._object2 = object
  }

  constructor(
    private readonly _entity: IEntity,
    private readonly _collisionDetector: ICollisionDetector
  ) {
    super('CollisionComponent')
    const collisionHandlerComponent = this._entity.getComponentByType(
      CollisionHandlerComponent
    )
    this._collisionDetector.subscribeToCollisions(
      collisionHandlerComponent.handleCollision.bind(collisionHandlerComponent)
    )
  }

  update(dt: number) {
    if (!this._object2) return
    const object1 =
      this._entity.getComponentByType<ObjectComponent>(ObjectComponent)
    this._collisionDetector.checkCollision(object1, this._object2)
  }

  render(dt: number) {}
}
