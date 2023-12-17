import ObjectComponent from '../../../browser/component/ObjectComponent'
import PlayerEntity from '../../../browser/entity/PlayerEntity'
import { default as PlayerEntityBuilderBase } from '../../../browser/entity/builder/PlayerEntityBuilder'
import MovementComponent from '../../component/MovementComponent'

export default class PlayerEntityBuilder extends PlayerEntityBuilderBase {
  protected addMovementComponent(entity: PlayerEntity, _: ObjectComponent) {
    entity.addComponent(new MovementComponent(this._input!))
  }
}
