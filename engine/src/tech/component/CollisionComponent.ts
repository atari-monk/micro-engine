import { ICollisionDetector, IEntity, IObject } from 'engine_api'
import Component from '../entity_component/Component'
import ObjectComponent from './ObjectComponent'
import CollisionHandlerComponent from './CollisionHandlerComponent'

export default class CollisionComponent extends Component {
  private _object1!: IObject
  private _object2!: IObject

  set object2(object: IObject) {
    this._object2 = object
  }

  constructor(
    private readonly _entity: IEntity,
    private readonly _collisionDetector: ICollisionDetector
  ) {
    super('CollisionComponent')
    this._object1 = this._entity.getComponentByType(ObjectComponent)
  }

  setCollisionHandler() {
    const collisionHandlerComponent = this._entity.getComponentByType(
      CollisionHandlerComponent
    )
    this._collisionDetector.subscribeToCollisions(
      collisionHandlerComponent.handleCollision.bind(collisionHandlerComponent)
    )
  }

  update(dt: number) {
    if (!this._object2) return
    this._collisionDetector.checkCollision(this._object1, this._object2)
  }

  render(dt: number) {}
}
