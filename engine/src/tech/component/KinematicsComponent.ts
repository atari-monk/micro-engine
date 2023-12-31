import { IEntity, IEventSystem, IObject } from 'engine_api'
import Component from '../entity_component/Component'
import ObjectComponent from './ObjectComponent'
import Vector2 from '../../math/vector/Vector2'

export class KinematicsComponent extends Component {
  private _objectComponent: IObject
  private readonly frictionCoefficient: number = 0.85
  private readonly stopThreshold: number = 3

  constructor(
    private readonly _entity: IEntity,
    private readonly _eventSystem: IEventSystem
  ) {
    super('KinematicsComponent')
    this._objectComponent = this._entity.getComponentByType(ObjectComponent)
  }

  update(dt: number) {
    this._objectComponent.position.add(
      Vector2.getNew(this._objectComponent.velocity).multiply(dt)
    )

    this._objectComponent.velocity.multiply(
      Math.pow(this.frictionCoefficient, dt)
    )

    if (this._objectComponent.velocity.length() < this.stopThreshold) {
      if (
        this._objectComponent.velocity.x !== 0 ||
        this._objectComponent.velocity.y !== 0
      ) {
        this._objectComponent.velocity.x = 0
        this._objectComponent.velocity.y = 0
        this._eventSystem.publish('ballStop')
      }
    }
  }
}
