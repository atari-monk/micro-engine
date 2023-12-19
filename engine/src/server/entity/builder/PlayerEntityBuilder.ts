import { IDataEntityBuilder, IObject } from 'engine_api'
import EntityBuilderBase from '../../../browser/entity/builder/EntityBuilderBase'
import PlayerEntity from '../../../tech/entity/PlayerEntity'
import ObjectComponent from '../../../tech/component/ObjectComponent'
import MovementComponent from '../../component/MovementComponent'
import { IPlayerEntityBuilder } from './EntityBuilderAPI'

export default class PlayerEntityBuilder
  extends EntityBuilderBase
  implements IDataEntityBuilder<PlayerEntity, IObject>, IPlayerEntityBuilder
{
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
