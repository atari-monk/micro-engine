import {
  IEntityCreator,
  IEntityBuilder,
  IObject,
  IDataEntityBuilder,
  IEntityDataModel,
} from 'engine_api'
import MapEntity from '../../tech/entity/MapEntity'
import ObjectEntity from '../../tech/entity/ObjectEntity'
import PlayerEntity from '../../tech/entity/PlayerEntity'

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
