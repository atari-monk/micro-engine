import { IDataEntityBuilder, IObject, IWithLogger } from 'engine_api'
import PlayerEntity from '../../../tech/entity/PlayerEntity'
import ObjectEntity from '../../../tech/entity/ObjectEntity'

export interface IObjectEntityBuilder
  extends IDataEntityBuilder<ObjectEntity, IObject>,
    IWithLogger {}

export interface IPlayerEntityBuilder
  extends IDataEntityBuilder<PlayerEntity, IObject>,
    IWithLogger {}
