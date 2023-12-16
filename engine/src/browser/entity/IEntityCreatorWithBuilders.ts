import {
  IEntityCreator,
  IEntityBuilder,
  IObject,
  IDataEntityBuilder,
  IEntityDataModel,
} from 'engine_api'
import MapEntity from './MapEntity'
import ObjectEntity from './ObjectEntity'
import PlayerEntity from './PlayerEntity'

export default interface IEntityCreatorWithBuilders extends IEntityCreator {
  set mapEntityBuilder(mapEntityBuilder: IEntityBuilder<MapEntity>)
  set objectEntityBuilder(
    objectEntityBuilder: IDataEntityBuilder<ObjectEntity, IObject>
  )
  set spriteObjectEntityBuilder(
    spriteObjectEntityBuilder: IDataEntityBuilder<
      ObjectEntity,
      IEntityDataModel
    >
  )
  set playerEntityBuilder(
    playerEntityBuilder: IDataEntityBuilder<PlayerEntity, IObject>
  )
}
