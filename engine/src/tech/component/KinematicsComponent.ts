import { IEntity, IObject } from 'engine_api'
import Component from '../entity_component/Component'
import ObjectComponent from './ObjectComponent'
import Vector2 from '../../math/vector/Vector2'

export class KinematicsComponent extends Component {
  private _object: IObject
  private readonly frictionCoefficient: number = 0.985

  constructor(private readonly _entity: IEntity) {
    super('KinematicsComponent')
    this._object = this._entity.getComponentByType(ObjectComponent)
  }

  update(dt: number) {
    //this._object.speed.multiply(this.frictionCoefficient)
    this._object.position.add(
      Vector2.getNew(this._object.velocity).multiply(dt)
    )
  }
}
