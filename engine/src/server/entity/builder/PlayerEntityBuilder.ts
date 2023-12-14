import { IObject } from 'engine_api'
import EntityBuilder from '../../../browser/entity/builder/EntityBuilder'
import PlayerEntity from '../../../browser/entity/PlayerEntity'
import ObjectComponent from '../../../browser/component/ObjectComponent'
import MovementComponent from '../../component/MovementComponent'

export default class PlayerEntityBuilder extends EntityBuilder {
  build(objectData: IObject): PlayerEntity {
    if (this._logger === undefined) throw new Error('Logger not set!')
    if (!objectData) throw new Error('ObjectData not set!')

    const entity = new PlayerEntity()
    entity.logger = this._logger
    const objectComponent = new ObjectComponent(objectData)
    entity.addComponent(objectComponent)
    entity.addComponent(new MovementComponent(objectComponent))

    return entity
  }
}
