import {
  IDataEntityBuilder,
  IEntityBuilder,
  IEntityDataModel,
  IObject,
  IWithInputManager,
  IWithLogger,
  IWithRenderer,
  IWithTileMap,
} from 'engine_api'
import MapEntity from '../../../tech/entity/MapEntity'
import ObjectEntity from '../../../tech/entity/ObjectEntity'
import PlayerEntity from '../../../tech/entity/PlayerEntity'

export interface IMapEntityBuilder
  extends IEntityBuilder<MapEntity>,
    IWithLogger,
    IWithTileMap {}

export interface IObjectEntityBuilder
  extends IDataEntityBuilder<ObjectEntity, IObject>,
    IWithLogger,
    IWithRenderer {}

export interface ISpriteObjectEntityBuilder
  extends IDataEntityBuilder<ObjectEntity, IEntityDataModel>,
    IWithLogger,
    IWithRenderer {}

export interface IPlayerEntityBuilder
  extends IDataEntityBuilder<PlayerEntity, IObject>,
    IWithLogger,
    IWithRenderer,
    IWithInputManager {}
