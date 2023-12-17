import { IDataEntityBuilder, IObject, IWithLogger } from 'engine_api'
import PlayerEntity from '../../../browser/entity/PlayerEntity'
import ObjectEntity from '../../../browser/entity/ObjectEntity'

export interface IObjectEntityBuilder
  extends IDataEntityBuilder<ObjectEntity, IObject>,
    IWithLogger {}

export interface IPlayerEntityBuilder
  extends IDataEntityBuilder<PlayerEntity, IObject>,
    IWithLogger {}
